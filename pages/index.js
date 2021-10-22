import SearchBar from 'components/inputs/SearchBar';
import useField from 'hooks/useField';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from 'public/United_States_Department_of_Defense_Seal.svg.png';
import React from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';
import useSpotlightCourses from '../hooks/useSpotlightCourses';
import { useConfig } from '../hooks/useConfig';
import { backendHost } from '../config/endpoints';

export default function Home() {
  const router = useRouter();

  const spotlight = useSpotlightCourses();
  const uiConfig = useConfig();
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

  const handleSearch = () => {
    if (fields.keyword && fields.keyword !== '') {
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
          <Image src={logo} height={100} width={100} />
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
          className='absolute bottom-20 left-0 w-full overflow-x-hidden'
        >
          <div className='flex overflow-x-auto px-2 gap-2 py-5 custom-scroll '>
            {spotlight.isSuccess &&
              spotlight.data.length > 0 &&
              spotlight.data.map(({ Course, meta }) => {
                return (
                  <div
                    className='z-0 overflow-hidden relative rounded-md shadow hover:shadow-lg transform transition-shadow duration-150 ease-in-out bg-blue-200 flex-shrink-0  to-transparent cursor-pointer'
                    style={{ height: '176px', width: '296px' }}
                  >
                    <div className='absolute top-0 p-2 font-sans text-gray-50 text-shadow-md z-20'>
                      <h2 className='line-clamp-2 font-semibold break-words break-normal'>
                        {Course.CourseTitle}
                      </h2>
                      <div>
                        <label className='font-semibold'>Provider:&nbsp;</label>
                        {Course.CourseProviderName}
                      </div>
                    </div>
                    <div className='h-full w-full absolute bg-gradient-to-b from-black-70 to-black-10 z-10'></div>
                    <img
                      src={backendHost + uiConfig.data.course_img_fallback}
                      alt=''
                      className='h-full w-full absolute'
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
