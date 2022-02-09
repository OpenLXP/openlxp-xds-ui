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
import { StarIcon } from '@heroicons/react/solid';
import ViewBtn from '@/components/buttons/ViewBtn';

const cleanDataOfHtml = (data) => {
  return data?.replace(/<[^>]*>?/gm, '');
};

// convert date to mm/dd/yyyy format
const convert = (date) => {
  const d = new Date(date);

  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  const newDate = [month, day, year].join('/');
  return newDate;
};

function Description({ data }) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 htmlFor='Description' className='text-lg font-sans font-semibold'>
        Description
      </h2>
      <p>{data}</p>
    </div>
  );
}

function Prerequisites({ data }) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 htmlFor='Description' className='text-lg font-sans font-semibold'>
        Prerequisites
      </h2>
      <p>{data || 'No Prerequisites'}</p>
    </div>
  );
}

function CourseAudience({ data }) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 htmlFor='Description' className='text-lg font-sans font-semibold'>
        Audience
      </h2>
      <p>{data}</p>
    </div>
  );
}

function Image({ thumbnail }) {
  return (
    <img
      className='rounded col-span-1 aspect-video'
      src={thumbnail}
      alt='thumbnail'
    />
  );
}

function Details({ course }) {
  return (
    <div className='grid grid-cols-2 gap-2 pt-6 border-t border-gray-400'>
      <span>
        <label className='font-semibold'>Start Date:</label>&nbsp;
        {convert(course?.data?.Course_Instance?.StartDate) || 'Not Available'}
      </span>
      <span>
        <label className='font-semibold'>End Date:</label>&nbsp;
        {convert(course?.data?.Course_Instance?.EndDate) || 'Not Available'}
      </span>
      <span>
        <label className='font-semibold'>Course Provider:</label>&nbsp;
        {cleanDataOfHtml(course?.data?.Course?.CourseProviderName) ||
          'Not Available'}
      </span>
      <span>
        <label className='font-semibold'>Delivery Method:</label>&nbsp;
        {cleanDataOfHtml(course?.data?.Course?.CourseSectionDeliveryMode) ||
          'Not Available'}
      </span>
      <span>
        <label className='font-semibold'>Course Code:</label>&nbsp;
        {cleanDataOfHtml(course?.data?.Course?.CourseCode) || 'Not Available'}
      </span>
      <span>
        <label className='font-semibold'>Course Instructor:</label>&nbsp;
        {cleanDataOfHtml(course?.data?.Course_Instance?.Instructor) ||
          'Not Available'}
      </span>
    </div>
  );
}

function Controls({ data }) {
  const { user } = useAuth();
  return (
    <div className='flex justify-end h-min gap-2 my-3'>
      <ExternalBtn url={data?.Course?.CourseURL} />
      {user && <SaveModal courseId={data?.meta?.metadata_key_hash} />}
    </div>
  );
}

function RelatedCourses({ data }) {
  return (
    <div className='flex justify-center w-full overflow-x-hidden'>
      <div className='inline-flex overflow-x-auto gap-2 py-4 custom-scroll '>
        {data.hits.map((course) => {
          return <CourseSpotlight course={course} />;
        })}
      </div>
    </div>
  );
}

export default function Course() {
  // grab the course id
  const { query } = useRouter();

  // state of the fetching
  const config = useConfig();
  const course = useCourse(query?.courseId);
  const moreLikeThis = useMoreCoursesLikeThis(query?.courseId);

  const thumbnail = useMemo(() => {
    let image = null;
    if (moreLikeThis.isSuccess && course.isSuccess) {
      image = course?.data?.Technical_Information?.Thumbnail;
    }
    if (config.isSuccess && !image) {
      image = `${backendHost}${config.data.course_img_fallback}`;
    }
    return image;
  }, [course, config, moreLikeThis]);

  return (
    <DefaultLayout>
      <div className='pt-32' id='image'></div>
      <h1 className='font-bold text-3xl font-sans'>
        {course?.data?.Course?.CourseTitle}
      </h1>
      <div className='grid grid-cols-2 gap-8 mt-4 pb-32'>
        <div id='left-col'>
          <Image thumbnail={thumbnail} />
          <Controls data={course?.data} />
          <Details course={course} />
        </div>
        <div className='flex flex-col gap-2 justify-start'>
          <Description
            data={cleanDataOfHtml(course?.data?.Course?.CourseShortDescription)}
          />
          <CourseAudience
            data={cleanDataOfHtml(course?.data?.Course?.CourseAudience)}
          />
          <Prerequisites
            data={cleanDataOfHtml(course?.data?.Course?.CoursePrerequisites)}
          />
        </div>
      </div>
      {moreLikeThis.isSuccess && <RelatedCourses data={moreLikeThis.data} />}
    </DefaultLayout>
  );
}
