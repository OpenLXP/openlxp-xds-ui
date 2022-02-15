import { QueryClient, dehydrate } from 'react-query';
import { URLSearchParams } from 'url';
import { axiosInstance } from '@/config/axiosConfig';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

// components
import { Pagination } from '@/components/buttons/Pagination';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import CreateSavedSearchModal from '@/components/modals/CreateSavedSearch';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import MoreLikeThis from '@/components/cards/MoreLikeThis';
import SearchBar from '@/components/inputs/SearchBar';
import SearchResult from '@/components/cards/SearchResult';
import SelectList from '@/components/inputs/SelectList';

// contexts
import { useAuth } from '@/contexts/AuthContext';

// hooks
import { useConfig } from '@/hooks/useConfig';
import { useSearch } from '@/hooks/useSearch';
import { useSearchUrl } from '@/hooks/useSearchUrl';

// config
import { oneHour } from '@/config/timeConstants';
import { searchUrl } from '@/config/endpoints';


// Server Side Generation
export async function getServerSideProps({ query }) {
  // parsing the url params
  const queryParams = new URLSearchParams(query);
  const params = queryParams.toString();

  // the full url for elastic search based on the searchURL and its params
  const url = `${searchUrl}?${params}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['search', url],
    () => axiosInstance.get(url).then((res) => res.data),
    { staleTime: oneHour, cacheTime: oneHour }
  );
  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default function Search({ query }) {
  const router = useRouter();
  const config = useConfig();
  const [params, setParams] = useState(query);
  const { url, setUrl } = useSearchUrl(query);
  const { data, refetch, isError, isSuccess, isLoading } = useSearch(url);
  const { user } = useAuth();

  //xAPI Statement
  const xAPISendStatement = (searchTerm) => {
    if (user && isSuccess) {
      const verb = {
        id: "https://w3id.org/xapi/dod-isd/verbs/searched",
        display: "searched"
      }

      const domain = (new URL(window.location));
      const objectId = `${domain.origin}/search`;

      const objectDefName = "ECC Search Capability"
      const resultExtName = "https://w3id.org/xapi/ecc/result/extensions/searchTerm";

      sendStatement(user.user, verb, objectId, objectDefName, resultExtName, searchTerm);
    }
  }

  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  }

  function handleClear(key) {
    if (params[key] && params.keyword && params.keyword !== '') {
      const modified = { ...params };
      delete modified[key];
      delete modified['undefined'];

      modified.p = 1;
      setParams(modified);
      setUrl(modified);

      router.push({ pathname: '/search', query: modified });
    }
  }


  function handleListSelect(event) {
    if (params.keyword && params.keyword !== '') {
      const modified = { ...params };
      modified[event.target.name] = event.target.value;
      modified.p = 1;
      setUrl(modified);
      setParams(modified);
      router.push({ pathname: '/search', query: modified });
    }
  }

  function handleReset(key) {
    const modified = { ...params };
    modified[key] = '';
    setParams(modified);
  }

  function handleSearch() {
    // if there is a key word
    if (params.keyword && params.keyword !== '') {
      const modified = { ...params };

      // setting the page to 1
      modified.p = 1;

      setParams(modified);
      setUrl(modified);
      xAPISendStatement(modified.keyword);

      router.push({ pathname: '/search', query: modified });
    }
  }

  function handleSpecificPage(page) {
    const modified = { ...params };
    modified.p = page;
    setParams(modified);
    setUrl(modified);
    router.push({ pathname: '/search', query: modified }, undefined, {
      scroll: true
    });
  }

  function createLists() {
    if (!data?.aggregations) return null;

    const { aggregations } = data;
    const keys = Object?.keys(aggregations);

    return keys?.map((key) => {
      const localData = aggregations?.[key];
      return (
        <SelectList
          key={key + localData.field_params}
          initialValue={params[localData.field_name]}
          options={localData}
          keyName={key}
          onChange={handleListSelect}
          onClear={handleClear}
        />
      );
    });
  }

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-28 pb-8'>
        <div className='flex flex-col py-2 mb-4 w-8/12 sticky top-0 z-10 bg-gray-50'>
          <div className='max-w-max self-end'>
            {user && <CreateSavedSearchModal path={router.asPath} />}
          </div>
          <SearchBar
            parameters={params}
            onChange={handleChange}
            onReset={handleReset}
            onClick={handleSearch}
          />
          {data && !isLoading && (
            <div className='flex gap-2 pl-6 pt-2'>{data && createLists()}</div>
          )}
        </div>
        {data && (
          <span className={'text-gray-400 italic pt-12 font-sans px-px'}>
            About {data.total} results
          </span>
        )}
        <div className={'grid grid-cols-12 pt-2 gap-12 '}>
          <div id='search-results' className={'col-span-8 grid gap-8 relative'}>
            {data &&
            data?.hits?.map((course) => (
              <SearchResult result={course} key={course.meta.id} />
            ))}
            <div className='py-8 sticky bottom-0 bg-gradient-to-t from-gray-50 mb-8'>
              {!isLoading && data && (
                <Pagination
                  totalPages={Math.ceil(data?.total / config?.data?.search_results_per_page)}
                  handleSpecificPage={handleSpecificPage}
                  currentPage={parseInt(params.p)}
                />
              )}
            </div>
          </div>
          <div className='relative col-span-4'>
            <div className='sticky top-48'>
              {data && data?.hits && <MoreLikeThis course={data?.hits[0]} />}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
