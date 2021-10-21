import { useRouter } from 'next/dist/client/router';
import { useQuery, useQueryClient } from 'react-query';
import React, { useEffect, useState } from 'react';
import useCourse from '../../hooks/useCourse';
import useConfig from '../../hooks/useConfig';
import usePrepareCourseData from 'hooks/usePrepareCourseData';

export default function Course() {
  // grab the course id
  const { query } = useRouter();
  // state of the fetching
  const course = useCourse(query?.courseId);
  const config = useConfig();

  let preparedData;
  if (config.isSuccess && course.isSuccess) {
    preparedData = usePrepareCourseData(config.data, course.data);
  }
  // loading skeleton
  if (course.isLoading || config.isLoading) {
    return (
      <div className='pt-32  animate-pulse'>
        <div className='grid grid-cols-3 gap-8 mt-8'>
          <div className='h-16 col-span-2 rounded-md bg-gray-200'></div>
          <div className='h-16 col-span-1 inline-flex justify-end gap-2'>
            <div className='h-16 w-16 rounded-full bg-gray-200'></div>
            <div className='h-16 w-16 rounded-full bg-gray-200'></div>
            <div className='h-16 w-16 rounded-full bg-gray-200'></div>
          </div>
          <div className='col-span-2 h-96 rounded-md bg-gray-200'></div>
          <div className='col-span-1 h-72 rounded-md bg-gray-200'></div>
        </div>
      </div>
    );
  }
  return (
    <div className='pt-32'>
      <div className='inline-flex justify-between w-full items-center border-b pb-5'>
        <div className='font-semibold text-3xl col-span-2 rounded-md bg-gray-200'>
          {preparedData.courseTitle}
        </div>
        <div className='inline-flex justify-end gap-2'>
          <div className='h-12 w-12 rounded-full bg-gray-200'></div>
          <div className='h-12 w-12 rounded-full bg-gray-200'></div>
          <div className='h-12 w-12 rounded-full bg-gray-200'></div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-8 mt-8'>
        <div className='col-span-2 '>
          <div className='rounded-md  text-xl bg-white border border-gray-200 shadow-sm p-4'>
            {preparedData.courseDescription}
          </div>
        </div>
        <div className='col-span-1'>
          <div className='rounded-md bg-white border border-gray-200 shadow-sm p-4'>
            {preparedData.courseDetails.map((detail) => {
              return (
                <div>
                  <label className='font-semibold'>
                    {detail.displayName}:&nbsp;
                  </label>
                  {detail.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
