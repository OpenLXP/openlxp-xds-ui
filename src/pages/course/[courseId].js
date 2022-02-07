import { useRouter } from 'next/dist/client/router';
import React, { useMemo } from 'react';


// hooks
import { useConfig } from '@/hooks/useConfig';
import { useCourse } from '@/hooks/useCourse';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import usePrepareCourseData from '@/hooks/usePrepareCourseData';

// components
import { useAuth } from '@/contexts/AuthContext';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ExternalBtn from '@/components/buttons/ExternalBtn';
import SaveModal from '@/components/modals/SaveModal';

// config
import { backendHost } from '@/config/endpoints';

export default function Course() {
  // grab the course id
  const { user } = useAuth();
  const { query } = useRouter();

  // state of the fetching
  const config = useConfig();
  const course = useCourse(query?.courseId);
  const moreLikeThis = useMoreCoursesLikeThis(query?.courseId);

  const preparedData = useMemo(() => {
    if (course.isSuccess && config.isSuccess) {
      return usePrepareCourseData(config.data, course?.data);
    }
  }, [config.data, course.data]);

  const thumbnail = useMemo(() => {
    let image=null
    if (moreLikeThis.isSuccess && course.isSuccess) {
      image = course?.data?.Technical_Information?.Thumbnail;
    }
    if (config.isSuccess && !image) {
      image = `${backendHost}${config.data.course_img_fallback}`;
    }
    return image;
  }, [course, config, moreLikeThis]);

  // loading skeleton
  if (course.isLoading || config.isLoading) {
    return (
      <DefaultLayout footerLocation='absolute'>
        <div className='pt-32  animate-pulse'>
          <div className='grid grid-cols-3 gap-8 mt-8'>
            <div className='h-16 col-span-2 rounded-md bg-gray-200' />
            <div className='h-16 col-span-1 inline-flex justify-end gap-2'>
              <div className='h-16 w-16 rounded-full bg-gray-200' />
              <div className='h-16 w-16 rounded-full bg-gray-200' />
              <div className='h-16 w-16 rounded-full bg-gray-200' />
            </div>
            <div className='col-span-2 h-96 rounded-md bg-gray-200' />
            <div className='col-span-1 h-72 rounded-md bg-gray-200' />
          </div>
        </div>
      </DefaultLayout>
    );
  }

  // successful loading
  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-32'>
        <div className='inline-flex justify-between w-full items-center border-b pb-5'>
          <h1 className='font-semibold text-3xl col-span-2'>
            {preparedData?.courseTitle}
          </h1>
          <div className='inline-flex justify-end gap-2 items-center'>
            <ExternalBtn url={preparedData?.courseUrl} />
            {user && (
              <SaveModal
                courseId={
                  course.data?.meta?.metadata_key_hash
                    ? course?.data?.meta?.metadata_key_hash
                    : course.data?.meta?.id
                }
              />
            )}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-8 mt-8'>
          <div className='col-span-2 '>
            {thumbnail && (
              <div
                className='float-left mx-5 mt-6 rounded-md clear-left bg-blue-200'
                style={{ height: '176px', width: '296px' }}
              >
                <img
                  src={thumbnail}
                  alt=''
                  className='rounded-md h-full w-full'
                />
              </div>
            )}
            <p
              className='rounded-md  text-xl bg-white border border-gray-200 shadow-sm p-4 mb-80'
              style={{ minHeight: 'calc(176px + 3.25rem)' }}
            >
              {preparedData?.courseDescription?.replace(/<[^>]*>?/gm, '');}
            </p>
          </div>
          <div className='col-span-1'>
            <div className='rounded-md bg-white border border-gray-200 shadow-sm p-4 space-y-1'>
              {preparedData?.courseDetails?.map((detail) => {
                return (
                  <div key={detail?.displayName}>
                    <label className='font-semibold'>
                      {detail?.displayName}:&nbsp;
                    </label>
                    {detail?.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          id='course-carousel'
          className='absolute bottom-0 flex justify-center left-0 w-full overflow-x-hidden'
        >
          <div className='inline-flex overflow-x-auto px-2 gap-2 py-5 custom-scroll '>
            {moreLikeThis.isSuccess &&
              moreLikeThis.data.hits.map((course) => {
                return <CourseSpotlight course={course} />;
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
