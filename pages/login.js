import { useAuth } from '../contexts/AuthContext';
import useField from '../hooks/useField';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';

export default function Login() {
  const { login } = useAuth();
  const {fields:credentials, updateKeyValuePair} = useField({
    username: '',
    password: '',
  });
  const setCredentials = (event) => {
    updateKeyValuePair(event.target.name, event.target.value)
}
  const {fields:error, updateKeyValuePair:setError} = useField(false);

  const doLogin = () => {
    if (credentials.username === '' || credentials.password === '') {
      setError(true);
    } else {
      login(credentials);
    }
  };

  return (
    <>
      <div className={'py-20'}>
        <div
          className={'mt-10 mx-52 flex flex-col items-center justify-between'}
        >
          <Image src={logo} alt={'home'} height={'100'} width={'100'} />
          <p className={'mt-2 text-2xl font-extrabold '}>
            Sign in to your account
          </p>
          <Link href={'/register'}>
            <p
              id={'create-account-button'}
              className={
                'text-blue-600 text-base underline hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out'
              }
            >
              Create an Account
            </p>
          </Link>
        </div>
        <div
          className={
            'px-8 pt-20 pb-8 mt-4 mb-10 mx-96 bg-white flex flex-col items-center justify-between shadow-md rounded'
          }
        >
          {error && (
            <p className={'text-red-600'}>Please enter a username/password</p>
          )}
          <input
            type={'text'}
            className={
              'flex shadow-md mb-5 text-gray-600 p-2 px-3 border rounded-r w-full'
            }
            value={credentials.username}
            placeholder={'Username'}
            name={'username'}
            onChange={(event) => setCredentials(event)}
          />
          <input
            type={'password'}
            className={
              'flex shadow-md text-gray-600 p-2 px-3 border rounded-r w-full'
            }
            value={credentials.password}
            placeholder={'Password'}
            name={'password'}
            onChange={(event) => setCredentials(event)}
          />
          <Link href={'/forgotPassword'}>
            <p
              id={'forgot-password-button'}
              className={
                'text-blue-600 text-base underline items-left justify-left hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out'
              }
            >
              Forgot Password
            </p>
          </Link>
          <div
            className={
              'items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white pl-2 pr-4 py-2 mt-4 transform transition-all duration-150 ease-in-out border-blue-300 border-2 outline-none focus:ring-2 ring-blue-300'
            }
            onClick={() => doLogin()}
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
                d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
              />
            </svg>
            Login
          </div>
          <p className={'my-8 relative border-b-2 w-full'}>
            <span className='absolute top-1/2 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/2 bg-white px-2 w-max'>
              or continue with
            </span>
          </p>
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
      </div>
    </>
  );
}
