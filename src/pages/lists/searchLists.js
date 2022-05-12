import { useAuth } from '@/contexts/AuthContext';
import { useInterestLists } from '@/hooks/useInterestLists';
import { useRouter } from 'next/router';
import { useSubscribeToList } from '@/hooks/useSubscribeToList';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/inputs/SearchBar';

// chunk the lists into pages of a given size
function chunkArray (array, chunkSize) {
  let results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
};

export default function SearchLists() {
  const router = useRouter();

  // Get the user's auth context
  const { user } = useAuth();

  // get lists from server
  const interestLists = useInterestLists();
  const subscribedLists = useSubscribedLists();
  const { mutate: subscribe } = useSubscribeToList();
  const { mutate: unsubscribe } = useUnsubscribeFromList();

  // search query
  const [search, setSearch] = useState('');

  // current page
  const [page, setPage] = useState(0);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const resetSearch = () => {
    setSearch('');
  };

  const changePage = (number) => {
    setPage(page + number);
  };

  const goToList = (id) => {
    router.push(`/lists/${id}`);
  };

  // returns a list of lists that match the search query and are chunked into
  // pages of 10
  const listToDisplay = useMemo(() => {
    if (interestLists.isError) return [];

    // filter the list by the search query
    const filteredLists = interestLists.data?.filter((list) => {
      const { id, name } = list;
      return `${name.toLowerCase()}#${id}`.includes(search.toLowerCase());
    });

    // chunk the list into pages of 10
    if (filteredLists?.length > 0) {
      setPage(0);
      return chunkArray(filteredLists, 10);
    }

    // default to empty list
    return [];
  }, [interestLists?.isLoading, search]);

  useEffect(() => {
    // if the user is not logged in, redirect to the home page
    if (!user) router.push('/');
    else if (interestLists.isError){
      if(interestLists.error.response.status === 401)
        return router.push('/401');
      if(interestLists.error.response.status === 403)
        return router.push('/403');
    }
  }, []);

  return (
    <DefaultLayout>
      <h1 className='mt-10 pb-4 border-b text-3xl font-semibold'>
        Search List Catalogs
      </h1>
      <div className='flex justify-between items-baseline'>
        <div className='w-[44rem] mt-10'>
          <SearchBar
            parameters={{ keyword: search }}
            onChange={handleChange}
            onReset={resetSearch}
          />
        </div>
        <div>
          <div className='flex gap-2 items-center justify-end'>
            <button
              onClick={() => changePage(-1)}
              className='py-1 px-2 bg-blue-100 rounded-md border-blue-500 border text-blue-500 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={page === 0 || listToDisplay?.length === 0}
            >
              Prev
            </button>
            <button
              onClick={() => changePage(1)}
              className='py-1 px-2 bg-blue-100 rounded-md border-blue-500 border text-blue-500 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={
                listToDisplay?.length === page + 1 ||
                listToDisplay?.length === 0
              }
            >
              Next
            </button>
          </div>
          <div className='mt-2'>
            Showing{' '}
            <strong>
              {/* lower bound */}
              {listToDisplay[page]?.length > 0 ? page * 10 + 1 + '-' : ''}
              {/* upper bound */}
              {listToDisplay[page]?.length === 10
                ? page * 10 + 10
                : page * 10 + listToDisplay[page]?.length || '0'}
            </strong>
            &nbsp;out of {interestLists?.data?.length}
          </div>
        </div>
      </div>
      <table className='bg-white w-full rounded-md shadow mt-6 border-'>
        <thead className='font-normal border-b'>
          <tr className=''>
            <th className='text-left grid pl-2 py-2 gap-1.5 w-full'>
              <span className='text-xl font-medium font-sans'>Name</span>
              <span className='font-normal'>Identification Number</span>
            </th>
            <th className='sr-only' />
          </tr>
        </thead>
        <tbody className='font-normal'>
          {interestLists.isSuccess &&
            listToDisplay[page]?.map((list) => (
              <tr key={list.id} className='odd:bg-gray-50'>
                <td className='w-full pl-2 '>
                  <button
                    className='text-left hover:text-blue-600 w-full group'
                    onClick={() => {
                      goToList(list.id);
                    }}
                  >
                    <h4 className='font-medium group-hover:underline'>
                      {list.name}
                    </h4>
                    <span className='text-sm text-gray-800 group-hover:text-blue-600'>
                      #{list.id}
                    </span>
                  </button>
                </td>
                <td className='px-2'>
                  {subscribedLists.isSuccess &&
                  subscribedLists.data.find((sub) => sub.id === list.id) ? (
                    <button
                      onClick={() => unsubscribe({ id: list.id })}
                      className='bg-red-100 border border-red-500 text-red-500 px-2 py-1.5 my-2 rounded hover:bg-red-500 hover:text-white w-32'
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      onClick={() => subscribe({ id: list.id })}
                      className='bg-green-100 border border-green-500 text-green-500 px-2 py-1.5 my-2 rounded hover:bg-green-500 hover:text-white w-32'
                    >
                      Subscribe
                    </button>
                  )}
                </td>
                {/* look though the sub list and check if a user id matches the logged in user */}
              </tr>
            ))}
        </tbody>
      </table>
    </DefaultLayout>
  );
}
