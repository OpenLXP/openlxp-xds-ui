import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSaveSearchList } from '../../hooks/useSaveSearch';
import { useDeleteSavedSearch } from '../../hooks/useDeleteSavedSearch';
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
                    <div className='col-span-3 line-clamp-1'>{list.query}</div>
                    <div className='col-span-2 flex justify-end items-center gap-2 px-2'>
                      <button className='bg-gray-50 border-2 text-gray-500 border-gray-500 p-1 rounded-full transform transition-color duration-150 ease-in-out hover:text-white hover:bg-gray-500'>
                        <EyeIcon className='h-5 w-5 pl-px' />
                      </button>

                      <button
                        onClick={() => {
                          mutate({ id: list.id });
                        }}
                        className='flex items-center justify-center gap-2 bg-red-50 border-2 border-red-500 text-red-500 rounded-md py-1 px-2 hover:bg-red-600 hover:text-white transform transition-all duration-150'
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
