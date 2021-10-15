import { SearchIcon } from '@heroicons/react/solid';
import SearchBar from '../components/inputs/SearchBar';
import DefaultLayout from '../components/layouts/DefaultLayout';
import useField from '../hooks/useField';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const [parameters, setParameters, resetParameter] = useField({
    keyword: '',
    p: 1
  });

  const handleSearch = () => {
    if (parameters.keyword && parameters.keyword !== '') {
      router.push({ pathname: '/search/', query: parameters }).then();
    }
  };


  return <DefaultLayout>
    <div
      className={'flex flex-col items-center justify-center min-h-screen gap-8'}>
      <div className={'inline-flex items-center gap-4'}>
        <Image src={logo} height={100} width={100} />
        <div>
          <h1 className={'text-3xl font-semibold'}>Enterprise Course
            Catalog</h1>
          <h2 className={'text-xl sans'}>Department of Defense</h2>
        </div>
      </div>
      <div className={'w-6/12'}>
        <SearchBar
          parameters={parameters}
          onReset={resetParameter}
          onClick={handleSearch}
          onChange={setParameters}
        />
      </div>
      {/* <button
        id={'search-button'}
        onClick={handleSearch}
        className={'flex justify-center items-center gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'}
      ><SearchIcon className={'h-5 w-5'} />
        Search
      </button> */}
    </div>
  </DefaultLayout>;
}
