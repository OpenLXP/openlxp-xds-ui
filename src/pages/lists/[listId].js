import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';

// components
import DefaultLayout from '@/components/layouts/DefaultLayout';

// hooks
import { useList } from '@/hooks/useList';

// contexts
import { useAuth } from '@/contexts/AuthContext';

export default function ListsView() {
  const router = useRouter();

  // user data
  const { user } = useAuth();

  const { data: list, isSuccess, isError, error } = useList(router.query.listId);

  // verify a user is logged in otherwise redirect to home page
  useEffect(() => {
    if (!user) router.push('/');
    if (isError && error.response.status === 401) router.push('/401');
    if (isError && error.response.status === 403) router.push('/403');
  }, [user, isError]);

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='py-32 font-sans'>
        <h1 className='font-semibold text-3xl pb-4 mb-8 border-b'>
          {isSuccess && list.name}
        </h1>

        <div className='grid grid-cols-2 gap-4 font-sans text-lg'>
          <div className='col-span-1'>
            <label>
              <span className='font-semibold'>Owner:</span>&nbsp;
              {isSuccess && list.owner.email}
            </label>
          </div>
          <div className='col-span-1'>
            <label>
              <span className='font-semibold'>Updated:</span>&nbsp;
              {isSuccess && new Date(list.modified).toString()}
            </label>
          </div>
        </div>
        {/*  description of the list*/}
        <h3 className='mt-10 font-semibold text-lg'>Description</h3>
        <textarea
          readOnly
          value={list?.description}
          rows={Math.max(list?.description?.length / 72, 4).toString()}
          className='w-full rounded-md border p-2'
        />
        {/*  table showing the list of items currently in the experiences array*/}
        <h3 className='mt-10 font-semibold text-lg'>Courses</h3>
        <div
          id='course-list'
          className='grid divide-y border rounded-md overflow-hidden shadow'
        >
          <div className='grid grid-cols-6 bg-gray-50 h-12 items-center px-2 font-sans font-semibold'>
            <div className='col-span-3'>Course Title</div>
            <div className='col-span-2'>Course Provider</div>
          </div>
          <div className='max-h-96 overflow-y-auto custom-scroll'>
            {isSuccess && list.experiences.length < 1 && (
              <div className='flex justify-center items-center bg-white'>
                <p className='text-center text-gray-500'>
                  No courses in this list
                </p>
              </div>
            )}
            {isSuccess &&
              list?.experiences?.map((course, index) => {
                return (
                  <div
                    key={course.meta.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <div className='grid grid-cols-6 h-12 items-center px-2'>
                      <div className='col-span-3'>
                        {course.Course.CourseTitle}
                      </div>
                      <div className='col-span-2'>
                        {course.Course.CourseProviderName}
                      </div>
                      <div className='max-w-min justify-self-end pr-4'>
                        <Link href={`/course/${course.meta.metadata_key_hash}`}>
                          <a className='text-blue-500 bg-blue-50 px-2 py-1 rounded-md border-blue-500 border hover:bg-blue-500 outline-none hover:text-white transform transition-colors duration-150 ease-in-out'>
                            View
                          </a>
                        </Link>
                      </div>
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
