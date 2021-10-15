import SearchResult from '@/components/cards/SearchResult';
import SelectList from '@/components/inputs/SelectList';
import axios from 'axios';
import DefaultLayout from 'components/layouts/DefaultLayout';
import { searchUrl } from 'config/endpoints';
import useUrl from 'hooks/useUrl';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { URLSearchParams } from 'url';
import SearchBar from '../components/inputs/SearchBar';
import { tenMinutes } from '../config/timeConstants';
import { useSearch } from '../hooks/useSearch';

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
  const router = useRouter();

  const [params, setParams] = useState(query);
  const [url, setUrl] = useUrl(query);
  const { data, refetch, isError, isSuccess } = useSearch(url);

  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleClear(key) {
    if (params[key]) {
      const modified = { ...params };
      delete modified[key];
      delete modified['undefined'];

      modified.p = 1;
      setParams(modified);
      setUrl(modified);

      router.replace({ pathname: '/search/', query: modified });
    }
  }

  function handleListSelect(event) {
    const modified = { ...params };
    modified[event.target.name] = event.target.value;

    setUrl(modified);
    setParams(modified);
    router.replace({ pathname: '/search/', query: modified });
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

      router.replace({ pathname: '/search/', query: modified });
    }
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
      <div className={'flex flex-col pt-28 pb-8 w-2/3'}>
        <a id={'save-this-search'} className={'self-end pr-6 pb-1 text-sm'}>
          Save this search
        </a>
        <SearchBar
          parameters={params}
          onChange={handleChange}
          onReset={handleReset}
          onClick={handleSearch}
        />
        <div className='flex gap-2 pl-6 pt-2'>{data && createLists()}</div>
      </div>
      {data && (
        <span className={'text-gray-400 italic mt-8 font-sans'}>
          About {data.total} results for "{params.keyword}"
        </span>
      )}
      <div className={'grid grid-cols-3 pt-2'}>
        <div id='search-results' className={'col-span-2 grid gap-8'}>
          {data?.hits?.map((course) => (
            <SearchResult result={course} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
