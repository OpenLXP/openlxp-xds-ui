import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../hooks/useConfig';
import { useMoreCoursesLikeThis } from '../../hooks/useMoreCoursesLikeThis';
import React, { useEffect } from 'react';
import SaveModal from '../modals/SaveModal'
import ShareBtn from '../buttons/ShareBtn';
import ViewBtn from '../buttons/ViewBtn';
import useTimeout from '../../hooks/useTimeout';

export default function MoreLikeThis({ course }) {
  const { data, isLoading } = useMoreCoursesLikeThis(course?.meta.id);
  const config = useConfig();
  const { user } = useAuth();
  const { state: view, show } = useTimeout(500);

  useEffect(() => {
    show();
  }, []);

  // if loading
  if (isLoading) {
    return (
      <div className='animate-pulse'>
        <div className='w-full bg-white border rounded-md border-gray-200 p-4'>
          <div className='w-3/4 bg-gray-200 rounded-sm h-8'></div>
          <div className='bg-gray-200 h-32 rounded-sm mt-4'></div>
          <div className='grid grid-cols-5 gap-2 mt-4'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='flex justify-between mt-8'>
            <div className='inline-flex justify-start gap-2'>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
            </div>
            <div className='rounded-l-2xl rounded-r-md h-6 w-10 bg-gray-200'></div>
          </div>
        </div>

        <div className='flex justify-center gap-2 mt-2'>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
        </div>
      </div>
    );
  }

  // if error
  else if (data.hits.length < 1) {
    return null;
  }

  // show suggested card
  return (
    <div>
      <span className={'text-gray-400 italic block pb-5 font-sans px-px'}>Similar Course</span>
      <div className='w-full bg-white border rounded-md border-gray-200 p-4 shadow'>
        <h1 className='text-lg font-semibold'>
          {data.hits[0].Course.CourseTitle}
        </h1>
        <p className='mt-4 font-sans line-clamp-6 text-sm'>
          {data.hits[0].Course.CourseShortDescription.replace(/(<([^>]+)>)/ig, '')}
        </p>
        <div className='flex flex-col gap-1 mt-4'>
          <div>
            <span className='font-semibold'>Course Code:&nbsp;</span>
            {data.hits[0].Course.CourseCode}
          </div>
          <div>
            <span className='font-semibold'>Course Type:&nbsp;</span>
            {data.hits[0].Course.CourseType}
          </div>
          <div>
            <span className='font-semibold'>Estimated Time:&nbsp;</span>
            {data.hits[0].Course.EstimatedCompletionTime}
          </div>
          <div>
            <span className='font-semibold'>Course Provider:&nbsp;</span>
            {data.hits[0].Course.CourseProviderName}
          </div>
        </div>
        <div className='flex justify-between mt-10'>
          <div className='flex gap-2'>
            <ShareBtn id={data.hits[0].meta.id} />
            <ViewBtn id={data.hits[0].meta.id} />
          </div>
          {user && <SaveModal courseId={data.hits[0].meta.id} />}
        </div>
      </div>
    </div>
  );
}