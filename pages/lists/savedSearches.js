import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EyeIcon, TrashIcon } from '@heroicons/react/outline';

// components
import DefaultLayout from '../../components/layouts/DefaultLayout';

// contexts
import { useAuth } from '../../contexts/AuthContext';

// hooks
import { useSaveSearchList } from '../../hooks/useSaveSearch';
import { useDeleteSavedSearch } from '../../hooks/useDeleteSavedSearch';

export default function SavedSearches() {
  const { user } = useAuth();
  const { data, isSuccess, isLoading, isError } = useSaveSearchList(
    user?.token
  );
  const { mutate } = useDeleteSavedSearch(user?.token);
  const router = useRouter();

  // if a user is not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-32'>
        <div id='title' className='pb-4 border-b mb-8'>
          <h1 className='font-semibold text-3xl'>Saved Searches</h1>
        </div>
        <div className=' rounded-md overflow-hidden shadow border'>
          <div className='grid grid-cols-8 bg-gray-50 h-12 items-center px-2 font-sans font-semibold'>
            <div className='col-span-3'>Search Title</div>
            <div className='col-span-3'>Query</div>
          </div>
          <div className='overflow-y-auto custom-scroll'>
            {isError && (
              <div className='text-center text-gray-600 bg-white'>
                There was an error loading your saved searches
              </div>
            )}
            {isLoading && (
              <div className='text-center text-gray-600 bg-white'>
                Loading...
              </div>
            )}
            {isSuccess && data.length === 0 && (
              <div className='text-center text-gray-600 bg-white'>
                You have no saved searches
              </div>
            )}
            {isSuccess &&
              data.length > 0 &&
              data?.map((list, index) => {
                return (
                  <div
                    key={list.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } grid grid-cols-8 w-full p-2 items-center`}
                  >
                    <h2 className='col-span-3 line-clamp-1'>{list.name}</h2>
                    <div className='col-span-4 line-clamp-1' title={list.query}>
                      {list.query}
                    </div>
                    <div className='col-span-1 flex justify-end items-center gap-2 px-2'>
                      <Link href={`${list.query}`}>
                        <button
                          id='view'
                          title='view'
                          className='flex items-center gap-2 bg-gray-50 border text-gray-500 border-gray-500 p-1 rounded-full transform transition-color duration-150 ease-in-out hover:text-white hover:bg-gray-500'
                        >
                          <EyeIcon className='h-5 w-5' />
                        </button>
                      </Link>

                      <button
                        onClick={() => mutate({ id: list.id })}
                        id='delete'
                        title='delete'
                        className='flex items-center justify-center gap-2 bg-red-50 border border-red-500 text-red-500 rounded-l-3xl rounded-r-md py-1 px-2 hover:bg-red-600 hover:text-white transform transition-all duration-150'
                      >
                        <TrashIcon className='h-5 w-5' />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}