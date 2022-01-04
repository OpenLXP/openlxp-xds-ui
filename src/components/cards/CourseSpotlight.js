import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { backendHost } from '@/config/endpoints';
import { useConfig } from '@/hooks/useConfig';

export default function CourseSpotlight({ course }) {
  const { Course, meta, Technical_Information } = { ...course };
  const uiConfig = useConfig();
  const router = useRouter();

  let thumbnail = null;

  if (Technical_Information?.Thumbnail) {
    thumbnail = Technical_Information.Thumbnail;
  } else if (uiConfig.isSuccess && uiConfig.data.course_img_fallback) {
    thumbnail = `${backendHost}${uiConfig.data.course_img_fallback}`;
  }

  const handleVisitCourse = () => {
    router.push(
      '/course/' + (meta?.metadata_key_hash ? meta.metadata_key_hash : meta.id)
    );
  };

  return (
    <Link href={`/course/${meta.metadata_key_hash || meta.id}`}>
      <div
        onClick={handleVisitCourse}
        className='z-0 overflow-hidden relative rounded-md shadow hover:shadow-lg bg-blue-200 cursor-pointer flex-shrink-0 transform transition-shadow duration-150 ease-in-out'
        style={{ height: '176px', width: '296px' }}
      >
        <div
          id='course-info'
          className='z-20 absolute top-0 p-2 font-sans text-gray-50 text-shadow-md'
        >
          <h2 className='font-semibold'>{Course.CourseTitle}</h2>
          <div>
            <span className='font-semibold'>Provider:&nbsp;</span>
            {Course.CourseProviderName}
          </div>
        </div>
        <div
          id='gradient-t-to-b'
          className='h-full w-full absolute bg-gradient-to-b from-black-70 to-black-10 z-10'
        />
        {thumbnail && (
          <img src={thumbnail} alt='' className='h-full w-full absolute' />
        )}
      </div>
    </Link>
  );
}
