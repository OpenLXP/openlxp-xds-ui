import React from 'react';
import Link from 'next/link';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import useUserOwnedLists from '../../hooks/useUserOwnedLists';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpenIcon, UsersIcon } from '@heroicons/react/solid';

export default function Owned({}) {
  const { user } = useAuth();
  const { data, isSuccess } = useUserOwnedLists(user?.token);
  return (
    <DefaultLayout footerLocation='absolute'>
      <div id='title' className='pt-32 pb-4 border-b mb-8'>
        <h1 className='font-semibold text-3xl'>My Lists</h1>
      </div>
      <div className='grid grid-cols-3 gap-8'>
        {isSuccess &&
          data.map((list) => {
            return (
              <div className='relative w-full bg-white border border-gray-200 shadow rounded-md'>
                <div className='p-2'>
                  <h2 className='font-semibold text-lg'>{list.name}</h2>
                  <div className='inline-flex gap-2'>
                    <div className='inline-flex -py-1 justify-start items-center gap-0.5 text-sm bg-blue-100 border border-blue-500 rounded-full px-2 text-blue-500'>
                      <UsersIcon className='h-3 w-3' />{' '}
                      {list.subscribers.length}
                    </div>
                    <div
                      className='inline-flex -py-1 justify-start items-center gap-0.5 text-sm
                    bg-green-100 border border-green-500 rounded-full px-2 text-green-500'
                    >
                      <BookOpenIcon className='h-3 w-3 mt-0.5' />
                      {list.experiences.length}
                    </div>
                  </div>

                  <p className='text-base line-clamp-4 pt-3'>
                    {list.description}
                  </p>
                </div>
                <div className='w-full flex justify-around items-center border-t divide-x mt-2'>
                  <Link href={`/lists/edit/${list.id}`}>
                    <a className='cursor-pointer flex-shrink-0 py-4 hover:bg-gray-100 w-1/2 text-center'>
                      Edit
                    </a>
                  </Link>
                  <Link href={`/lists/${list.id}`}>
                    <a className='cursor-pointer flex-shrink-0 py-4 hover:bg-gray-100 w-1/2 text-center'>
                      View
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </DefaultLayout>
  );
}
