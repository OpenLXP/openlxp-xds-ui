import axios from 'axios';
import { URLSearchParams } from 'url';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, QueryClient } from 'react-query';

import useUrl from '../hooks/useUrl';
import useConfig from '../hooks/useConfig';
import useSearch from '../hooks/useSearch';
import { searchUrl } from 'config/endpoints';
import { tenMinutes } from '../config/timeConstants';
import SearchBar from '../components/inputs/SearchBar';
import SelectList from '../components/inputs/SelectList';
import { Pagination } from '../components/buttons/Pagination';
import SearchResult from '../components/cards/SearchResult';
import DefaultLayout from 'components/layouts/DefaultLayout';

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
    () => axios.get(url).then((res) => res.data),
    { staleTime: tenMinutes }
  );
  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Search({ query }) {
  const [params, setParams] = useState(query);
  const [url, setUrl] = useUrl(query);

  const router = useRouter();
  const config = useConfig();
  const { data, refetch, isError, isSuccess, isLoading } = useSearch(url);

  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
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

      router.push({ pathname: '/search/', query: modified });
    }
  }

  function handleListSelect(event) {
    if (params.keyword && params.keyword !== '') {
      const modified = { ...params };
      modified[event.target.name] = event.target.value;

      setUrl(modified);
      setParams(modified);
      router.push({ pathname: '/search/', query: modified });
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
      if (data?.aggregations) {
        Object.keys(data.aggregations).map((key) => {});
      }

      setParams(modified);
      setUrl(modified);

      router.push({ pathname: '/search', query: modified });
    }
  }

  function handlePrevious() {
    const modified = { ...params };
    modified.p = parseInt(params.p) - 1;
    setParams(modified);
    setUrl(modified);
    router.push({ pathname: '/search', query: modified }, undefined, {});
  }
  function handelNext() {
    const modified = { ...params };
    modified.p = parseInt(params.p) + 1;
    setParams(modified);
    setUrl(modified);
    router.push({ pathname: '/search', query: modified }, undefined, {});
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

  // on the change of url refetch the data
  useEffect(() => {
    refetch();
  }, [url]);

  return (
    <DefaultLayout>
      <div className='pt-28 pb-8'>
        <div
          className={
            'flex flex-col pb-2 mb-4 w-3/4 sticky top-0 z-20 bg-gray-50'
          }
        >
          <button
            id={'save-this-search'}
            className={
              'self-end pr-6 pb-1 text-sm italic font-sans text-blue-400 hover:text-blue-300 hover:underline'
            }
          >
            Save this search
          </button>
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
        <div className={'grid grid-cols-8 pt-2 '}>
          <div id='search-results' className={'col-span-6 grid gap-8 relative'}>
            {data &&
              data?.hits?.map((course) => <SearchResult result={course} />)}
            <div className='py-8 sticky bottom-0 bg-gradient-to-t from-gray-50 '>
              {!isLoading && data && (
                <Pagination
                  totalPages={
                    data?.total / config?.data?.search_results_per_page
                  }
                  currentPage={parseInt(params.p)}
                  onNext={handelNext}
                  onPrevious={handlePrevious}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
