import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import SearchBar from '@/components/inputs/SearchBar';
import logo from '@/public/logo.png';
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
  const xAPISendStatement = (searchTerm) => {
    if (user) {
      const verb = {
        id: "https://w3id.org/xapi/acrossx/verbs/searched",
        display: "searched"
      }
      
      const objectId = `${window.location}search`;
      const objectDefName = "ECC Search Capability"
      const resultExtName = "https://w3id.org/xapi/ecc/result/extensions/searchTerm";

      sendStatement(user.user, verb, objectId, objectDefName, resultExtName, searchTerm);
    }
  };

  const handleSearch = () => {
    if (fields.keyword && fields.keyword !== '') {
      xAPISendStatement(fields.keyword);
      router.push({ pathname: '/search/', query: fields });
    }
  };

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  return (
    <>
      <Header />
      <div className='max-w-7xl mx-auto flex flex-col items-center justify-center mt-10'>
        <Image src={logo} height={250} width={250} alt='' />
        <h1 className='text-3xl font-bold mt-4'>Enterprise Course Catalog</h1>
        <h2 className='text-xl font-sans mt-2'>Department of Defense</h2>
      </div>
      <div className='w-6/12 mx-auto mt-6'>
        <SearchBar
          parameters={fields}
          onReset={resetKey}
          onClick={handleSearch}
          onChange={handleChange}
        />
      </div>
      {spotlight.isSuccess && spotlight.data.length > 0 && (
        <span className={'text-gray-400 italic block mt-24 font-sans px-2 max-w-7xl mx-auto'}>
          Spotlight Courses
        </span>
      )}
      <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto'>
        <div className='inline-flex overflow-x-auto gap-2 pb-4 custom-scroll '>
          {spotlight.isSuccess &&
            spotlight.data.length > 0 &&
            spotlight.data.map((course) => {
              return <CourseSpotlight course={course} key={course.meta.id} />;
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}
