import React, { useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// components
import DefaultLayout from '../../components/layouts/DefaultLayout';

// contexts
import { useAuth } from 'contexts/AuthContext';

// hooks
import { useSubscribedLists } from 'hooks/useSubscribedLists';
import { BookOpenIcon, UsersIcon } from '@heroicons/react/solid';
import { useUnsubscribeFromList } from 'hooks/useUnsubscribeFromList';

export default function Subscribed() {
  const { user } = useAuth();
  const { data: subscribed, isSuccess, isError, error } = useSubscribedLists(user?.token);
  const { mutate: unsubscribe } = useUnsubscribeFromList(user?.token);
  const router = useRouter();

  useEffect(() => {
    if (isError && error.response.status === 401) router.push('/401');
    if (isError && error.response.status === 403) router.push('/403');
  },[isError]);

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='py-32'>
        <h1 className='pb-4 border-b mb-8 font-semibold text-3xl'>
          Subscribed Lists
        </h1>
        <div className='grid grid-cols-3 gap-8'>
          {isSuccess &&
            subscribed.map((list) => {
              return (
                <div
                  className='relative w-full bg-white border border-gray-200 shadow rounded-md'
                  key={list.id}
                >
                  <h2 className='font-semibold text-lg px-2 pt-2'>
                    {list.name}
                  </h2>
                  <span className='inline-flex gap-2 px-2'>
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
                  </span>
                  <p className='text-base line-clamp-4 pt-3 mb-20 px-2'>
                    {list.description}
                  </p>
                  <div className='absolute bottom-0 left-0 w-full flex justify-around items-center border-t divide-x mt-2'>
                    <button
                      onClick={() => unsubscribe({ id: list.id })}
                      className='cursor-pointer flex-shrink-0 py-4 hover:bg-gray-100 w-1/2 text-center hover:text-red-500'
                    >
                      Unsubscribe
                    </button>

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
      </div>
    </DefaultLayout>
  );
}
