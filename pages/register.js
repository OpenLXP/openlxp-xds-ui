import DefaultLayout from 'components/layouts/DefaultLayout';
import { useAuth } from 'contexts/AuthContext';
import useField from 'hooks/useField';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';

export default function Register() {
  const [credentials, setCredentials] = useField({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const { register } = useAuth();

  return (
    <DefaultLayout>
      <div className={'mt-10 mx-52 flex flex-col items-center justify-between'}>
        <Image src={logo} alt={'home'} height={'100'} width={'100'} />
        <p className={'mt-2 text-2xl font-extrabold '}> Create your account</p>
        <Link href={'/login'}>
          <p
            id={'login-button'}
            className={
              'text-blue-600 text-base underline hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out'
            }
          >
            Sign in to your Account
          </p>
        </Link>
      </div>
      <div
        className={
          'px-8 pt-20 pb-8 mt-4 mb-10 mx-96 bg-white flex flex-col items-center justify-between shadow-md rounded'
        }
      >
        <input
          type={'text'}
          className={
            'flex shadow-md mb-5 text-gray-600 p-2 px-3 border rounded-r w-full'
          }
          placeholder={'First Name'}
          name={'first_name'}
          onChange={(event) => setCredentials(event)}
        />
        <input
          type={'text'}
          className={
            'flex shadow-md mb-5 text-gray-600 p-2 px-3 border rounded-r w-full'
          }
          placeholder={'Last Name'}
          name={'last_name'}
          onChange={(event) => setCredentials(event)}
        />
        <input
          type={'text'}
          className={
            'flex shadow-md mb-5 text-gray-600 p-2 px-3 border rounded-r w-full'
          }
          placeholder={'Email'}
          name={'email'}
          onChange={(event) => setCredentials(event)}
        />
        <input
          type={'password'}
          className={
            'flex shadow-md mb-5 text-gray-600 p-2 px-3 border rounded-r w-full'
          }
          placeholder={'Password'}
          name={'password'}
          onChange={(event) => setCredentials(event)}
        />

        <Link href={'/'}>
          <div
            className={
              'bg-blue-100 py-2 px-4 mt-6 rounded border border-blue-600 shadow-md inline-flex text-blue-500 hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'
            }
            onClick={() => register(credentials)}
            id={'login-button'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
              />
            </svg>
            Create
          </div>
        </Link>
        <p className={'mt-5'}>-------- Or continue with --------</p>
        <Link href={'/sso'}>
          <a
            id={'sso-button'}
            className={
              'bg-blue-500 py-2 px-4 mt-5 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'
            }
          >
            {' '}
            Single Sign On
          </a>
        </Link>
      </div>
    </DefaultLayout>
  );
}
