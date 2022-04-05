import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
<<<<<<< HEAD
import Image from 'next/image';
import React from 'react';

// components
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
=======
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import React, { useCallback } from 'react';
import SearchBar from '@/components/inputs/SearchBar';
import logo from '@/public/logo.png';
<<<<<<< HEAD

// hooks
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import useField from '@/hooks/useField';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';


=======
import useField from '@/hooks/useField';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const spotlight = useSpotlightCourses();
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

<<<<<<< HEAD
  //xAPI Statement
  const xAPISendStatement = (objectId) => {
    if (user) {
      const verb = {
        id: "https://w3id.org/xapi/dod-isd/verbs/searched",
        display: "searched"
      }
      sendStatement(user.user, verb, objectId);
    }
  }

  const handleSearch = () => {
    if (fields.keyword && fields.keyword !== '') {
      const objectId = `${window.location}search?keyword=${fields.keyword}&p=1`;
      xAPISendStatement(objectId);
=======
  const handleSearch = useCallback(
    (e) => {
      if (!fields.keyword || fields.keyword === '') return;
      const context = {
        actor: {
          first_name: user?.user?.first_name,
          last_name: user?.user?.last_name,
        },
        verb: {
          id: 'https://w3id.org/xapi/acrossx/verbs/searched',
          display: 'searched',
        },
        object: {
          definitionName: 'ECC Search Capability',
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
        resultExtValue: fields.keyword,
      };
      xAPISendStatement(context);
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
      router.push({ pathname: '/search/', query: fields });
    },
    [fields, user]
  );

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  return (
<<<<<<< HEAD
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
          className='absolute flex justify-center bottom-0 left-0 w-full overflow-x-auto custom-scroll'
        >
          <div className='inline-flex overflow-x-auto px-2 gap-2 py-5 custom-scroll '>
            {spotlight.isSuccess &&
              spotlight.data.length > 0 &&
              spotlight.data.map((course) => {
=======
    <>
      <Header />
      <div className='max-w-7xl mx-auto flex flex-col items-center justify-center mt-10'>
        <Image src={logo} height={250} width={250} alt='' />
        <h1 className='text-3xl font-bold mt-4'>Enterprise Course Catalog</h1>
        <h2 className='text-xl font-sans mt-2'>Department of Defense</h2>
      </div>
      <div className='w-[45rem] mx-auto mt-6'>
        <SearchBar
          parameters={fields}
          onReset={resetKey}
          onClick={handleSearch}
          onChange={handleChange}
        />
      </div>
      {spotlight.isSuccess && spotlight.data.length > 0 && (
        <>
          <span
            className={
              'text-gray-400 italic block mt-24 font-sans px-2 max-w-7xl mx-auto'
            }
          >
            Spotlight Courses
          </span>
          <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto'>
            <div className='inline-flex overflow-x-auto gap-2 pb-4 custom-scroll '>
              {spotlight.data.map((course) => {
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
                return <CourseSpotlight course={course} key={course.meta.id} />;
              })}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
