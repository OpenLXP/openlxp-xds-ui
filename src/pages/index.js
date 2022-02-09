import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

// components
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SearchBar from '@/components/inputs/SearchBar';
import logo from '@/public/logo.png';

// hooks
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import useField from '@/hooks/useField';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const spotlight = useSpotlightCourses();
  const uiConfig = useConfig();
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

  //xAPI Statement
  const xAPISendStatement = (objectId) => {
    if (user) {
      const verb = {
        id: 'https://w3id.org/xapi/dod-isd/verbs/searched',
        display: 'searched',
      };
      sendStatement(user.user, verb, objectId);
    }
  };

  const handleSearch = () => {
    if (fields.keyword && fields.keyword !== '') {
      const objectId = `${window.location}search?keyword=${fields.keyword}&p=1`;
      xAPISendStatement(objectId);
      router.push({ pathname: '/search/', query: fields });
    }
  };

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  return (
    <DefaultLayout>
      <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
        <div className={'flex flex-col text-center -mt-16 items-center gap-4'}>
          <Image src={logo} height={250} width={250} alt='' />
          <div>
            <h1 className={'text-3xl font-semibold'}>
              Enterprise Course Catalog
            </h1>
            <h2 className={'text-xl sans'}>Department of Defense</h2>
          </div>
        </div>
        <div className={'w-6/12'}>
          <SearchBar
            parameters={fields}
            onReset={resetKey}
            onClick={handleSearch}
            onChange={handleChange}
          />
        </div>

        <div className='flex justify-center w-full overflow-x-hidden'>
          <div className='inline-flex overflow-x-auto gap-2 pb-4 mt-44 custom-scroll '>
            {spotlight.isSuccess &&
              spotlight.data.length > 0 &&
              spotlight.data.map((course) => {
                return <CourseSpotlight course={course} key={course.meta.id} />;
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
