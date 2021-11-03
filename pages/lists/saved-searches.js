import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSaveSearchList } from '../../hooks/useSaveSearch';
import { useDeleteSavedSearch } from '../../hooks/useDeleteSavedSearch';
import Link from 'next/link';
import { backendHost } from '../../config/endpoints';

export default function SavedSearches() {
  const { user } = useAuth();
  const { data, isSuccess } = useSaveSearchList(user?.token);
  const { mutate } = useDeleteSavedSearch(user?.token);

  const handleDelete = (id) => {
    mutate({ id });
  };

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-32'>
        <div id='title' className='pb-4 border-b mb-8'>
          <h1 className='font-semibold text-3xl'>Saved Searches</h1>
        </div>
        <div className=' rounded-md overflow-hidden shadow border'>
          <div className='grid grid-cols-8 bg-gray-50 h-12 items-center px-2 font-sans font-semibold'>
            <div className='col-span-3'>Search Title</div>
            <div className='col-span-3'>Course Provider</div>
          </div>
          <div className='overflow-y-auto custom-scroll'>
            {isSuccess &&
              data.length > 0 &&
              data?.map((list, index) => {
                console.log(list);
                return (
                  <div
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
                          className='flex items-center gap-2 bg-gray-50 border-2 text-gray-500 border-gray-500 p-1 rounded-full transform transition-color duration-150 ease-in-out hover:text-white hover:bg-gray-500'
                        >
                          <EyeIcon className='h-5 w-5' />
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          mutate({ id: list.id });
                        }}
                        id='delete'
                        className='flex items-center justify-center gap-2 bg-red-50 border-2 border-red-500 text-red-500 rounded-l-3xl rounded-r-md py-1 px-2 hover:bg-red-600 hover:text-white transform transition-all duration-150'
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
