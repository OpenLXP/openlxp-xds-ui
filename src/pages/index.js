import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

// components
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SearchBar from '@/components/inputs/SearchBar';
import logo from '@/public/logo.png';

// hooks
import { useConfig } from '@/hooks/useConfig';
import useField from '@/hooks/useField';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';
import { useAuth } from '@/contexts/AuthContext';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';



export default function Home() {
  const router = useRouter();

  const { user } = useAuth();
  const spotlight = useSpotlightCourses();
  const uiConfig = useConfig();
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

  const handleSearch = () => {
    if (fields.keyword && fields.keyword !== '') {
      if (user) {
        const verb = {
          display: "searched"
        }

        const object = {
          id: `${router.pathname}search/${fields.keyword}`
        }

         sendStatement(user.user, verb, object);
      }

      router.push({ pathname: '/search/', query: fields });
    }
  };

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
        <div className={'inline-flex -mt-16 items-center gap-4'}>
          <Image src={logo} height={100} width={100} alt='' />
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
        <div
          id='course-carousel'
          className='absolute flex justify-center bottom-20 left-0 w-full overflow-x-auto custom-scroll'
        >
          <div className='inline-flex overflow-x-auto px-2 gap-2 py-5 custom-scroll '>
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
