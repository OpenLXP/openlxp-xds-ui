import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

// components
import DefaultLayout from 'components/layouts/DefaultLayout';
import SearchBar from '../../components/inputs/SearchBar';
import { Pagination } from 'components/buttons/Pagination';
import InterestListsResult from 'components/cards/InterestListsResult';

// contexts
import { useAuth } from '../../contexts/AuthContext';

// hooks
import { useSubscribedLists } from 'hooks/useSubscribedLists';
import { useInterestLists } from 'hooks/useInterestLists';
import { useSubscribeToList } from 'hooks/useSubscribeToList';
import { useUnsubscribeFromList } from 'hooks/useUnsubscribeFromList';

export default function SearchLists() {
  const router = useRouter();

  // Get the user's auth context
  const { user } = useAuth();

  // get lists from server
  const { data: interestLists, isSuccess, isError: interstListError, error: interestListErrorType } = useInterestLists();
  const { data: subscribedLists, isError: subscribedListError, error: subscribedListErrorType } = useSubscribedLists(user?.token);
  const { mutate: subscribe } = useSubscribeToList(user?.token);
  const { mutate: unsubscribe } = useUnsubscribeFromList(user?.token);

  // search query
  const [search, setSearch] = useState('');

  // current page
  const [page, setPage] = useState(0);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleReset = () => {
    setSearch('');
  };

  const handleSpecificPage = (page) => {
    setPage(page - 1)
  }

  // chunk the lists into pages of a given size
  const chunkArray = (array, chunkSize) => {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  };

  // returns a list of lists that match the search query and are chunked into
  // pages of 10
  const listToDisplay = useMemo(() => {
    // if the call is successful, filter the lists by the search query
    if (isSuccess) {
      const notOwner =
        interestLists?.filter((list) => list.owner.id !== user?.user?.id) || [];
      const filteredLists = notOwner.filter((list) =>
        list.name.toLowerCase().includes(search.toLowerCase())
      );

      // chunk the list into pages of 10
      if (filteredLists.length > 0) {
        return chunkArray(filteredLists, 10);
      }
      // default to empty list
      return [];
    }
  }, [interestLists, search]);

  useLayoutEffect(() => {
    // if the user is not logged in, redirect to the home page
    if (!user) router.push('/');
    if (interstListError){
      if (interestListErrorType.response.status === 401){
        router.push('/401')
      }
      if (interestListErrorType.response.status === 403){
        router.push('/403')
      }
    }
    if (subscribedListError){
      if (subscribedListErrorType.response.status === 401){
        router.push('/401')
      }
      if (subscribedListErrorType.response.status === 403){
        router.push('/403')
      }
    }
  }, [interstListError, subscribedListError]);

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='py-32'>
        <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>
          Search List Catalog
        </h1>
        <SearchBar
          onReset={handleReset}
          parameters={{ keyword: search }}
          onChange={handleChange}
        />
        <div className='pt-8 -mb-5'>
          <Pagination
            currentPage={page + 1}
            totalPages={listToDisplay?.length}
            handleSpecificPage={handleSpecificPage}
          />
        </div>
        <div className='bg-gray-50 shadow border rounded-md mt-8 overflow-hidden mb-8'>
          <div className='px-2 py-2 border-b'>
            <h2 className='tracking-widest font-semibold text-lg'>List Name</h2>
            <span className='tracking-wider'>List Description</span>
          </div>
          <div className=' overflow-y-auto custom-scroll'>
            {/*if there are no results to show....*/}
            {listToDisplay?.length === 0 && (
              <div className='text-center text-gray-600 bg-white'>
                No results found
              </div>
            )}
            {/*if there are results to show and the call was successful*/}
            {isSuccess &&
              listToDisplay?.[page]?.map((list, index) => {
                // determines if the user is subscribed to the list
                const isSubscribed = subscribedLists?.some(
                  (subscribedList) => subscribedList.id === list.id
                );
                return (
                  <div
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } font-sans flex justify-between items-center px-2 py-2`}
                    key={list.id}
                  >
                    <InterestListsResult
                      interestList={list}
                      isSubscribed={isSubscribed}
                      onSubscribe={() => subscribe({ id: list.id })}
                      onUnsubscribe={() => unsubscribe({ id: list.id })}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
