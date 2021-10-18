import SearchBar from '../components/inputs/SearchBar';
import DefaultLayout from '../components/layouts/DefaultLayout';
import useField from '../hooks/useField';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';
import React from 'react';

export default function Home() {
  const router = useRouter();
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
    <div
      className={'flex flex-col items-center justify-center min-h-screen gap-8'}
    >
      <div className={'inline-flex items-center gap-4'}>
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
    </div>
  );
}
