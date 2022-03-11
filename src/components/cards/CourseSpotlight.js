import { backendHost } from '@/config/endpoints';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useMemo } from 'react';

export default function CourseSpotlight({ course }) {
  const { Course, meta, Technical_Information, Course_Instance } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const thumbnail = useMemo(() => {
    let image = null;

    if (Course_Instance) {
      image = Course_Instance.Thumbnail;
    } else if (!image && Technical_Information) {
      image = Technical_Information.Thumbnail;
    } else {
      image = `${backendHost}${config.data.course_img_fallback}`;
    }
    return image;
  }, [Course_Instance, config]);

  //xAPI Statement
  const xAPISendStatement = () => {
    if (user) {
      const verb = {
        id: "https://w3id.org/xapi/tla/verbs/explored",
        display: "explored"
      }

      const domain = (new URL(window.location));
      const objectId = `${domain.origin}/course`;
      const resultExtName = "https://w3id.org/xapi/ecc/result/extensions/CourseId";

      const obj = {
        id: objectId,
        definitionName: Course.CourseTitle,
        description: Course.CourseShortDescription
      }

      sendStatement(user.user, verb, obj, resultExtName, meta?.metadata_key_hash ? meta.metadata_key_hash : meta.id);
    }
  }


  const handleVisitCourse = (e) => {
    xAPISendStatement();
    router.push(
      '/course/' + (meta?.metadata_key_hash ? meta.metadata_key_hash : meta.id)
    );
  };

  return (
    <Link href={`/course/${meta.metadata_key_hash || meta.id}`} passHref>
      <div
        onClick={handleVisitCourse}
        role='button'
        tabIndex='0'
        aria-hidden='true'
        className='z-0 overflow-hidden relative rounded-md shadow-stone-200 hover:shadow-lg bg-stone-200 cursor-pointer flex-shrink-0 transform transition-shadow duration-150 ease-in-out'
        style={{ height: '176px', width: '296px' }}
      >
        <div
          id='course-info'
          className='z-20 absolute top-0 p-2 font-sans text-gray-50 text-shadow-md'
        >
          <h2 className='font-bold'>{Course.CourseTitle}</h2>
          <div className='flex flex-col pt-2'>
            <div>
              <span className='font-semibold'>Provider:&nbsp;</span>
              {Course.CourseProviderName}
            </div>
          </div>
        </div>
        <div
          id='gradient-t-to-b'
          className='h-full w-full absolute bg-gradient-to-b from-black-70 to-black-10 z-10'
        />
        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt=''
            className='h-8 w-12 absolute bottom-0 right-0 m-2'
          />
        )}
      </div>
    </Link>
  );
}
