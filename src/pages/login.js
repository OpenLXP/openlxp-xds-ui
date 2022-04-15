import { LoginIcon } from '@heroicons/react/outline';
import { authLogin } from '@/config/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import ActionButton from '@/components/buttons/ActionButton';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Image from 'next/image';
import InputField from '@/components/inputs/InputField';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from '@/public/logo.png';
import useField from '@/hooks/useField';

// utils
import { axiosInstance } from '@/config/axiosConfig';
import { isValidEmail } from '@/utils/validation';

export default function Login() {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const { fields: credentials, updateKeyValuePair } = useField({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (user) router.push('/');
  }, []);

  const setCredentials = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };
  const [errorMsg, setErrorMsg] = useState();

  const handleLogin = () => {
    if (credentials.username === '' || credentials.password === '') {
      setErrorMsg('All fields required');
    } else if (!isValidEmail(credentials.username)) {
      setErrorMsg('Please enter a valid email address');
    } else {
      axiosInstance
        .post(authLogin, credentials)
        .then((res) => {
          login(res.data);
          router.push('/');
        })
        .catch((error) => {
          // logout();
          setErrorMsg('Invalid credentials');
        });
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <DefaultLayout>
      <div className={'pb-32'}>
        <div className='mt-10 mx-52 flex flex-col items-center justify-between'>
          <Image src={logo} alt={'home'} height={'200'} width={'200'} />
          <p className={'mt-2 text-2xl font-extrabold '}>
            Sign in to your account
          </p>
          <span>
            or &nbsp;
            <Link href={'/register'} passHref>
              <button
                id={'create-account-button'}
                className='text-blue-400 hover:underline hover:text-blue-500 cursor-pointer transition-all duration-150 ease-in-out'
              >
                Create an Account
              </button>
            </Link>
          </span>
        </div>
        <div className='w-1/3 p-8 mx-auto mt-10 bg-white flex flex-col items-center justify-between shadow-md rounded-md'>
          <div
            role='button'
            className='space-y-4 mb-4'
            onKeyPress={handleEnterKey}
            tabIndex='0'
          >
            <input
              type='text'
              title='username'
              name='username'
              id='username'
              placeholder='Email'
              value={credentials.username}
              onChange={setCredentials}
              className='shadow focus:shadow-md rounded-md p-2 w-full border border-gray-200 text-gray-700 focus:ring-2 ring-blue-400 outline-none  transition-all  duration-200'
            />

            <InputField
              type={'password'}
              value={credentials.password}
              placeholder='Password'
              name='password'
              onChange={(event) => setCredentials(event)}
            />
          </div>
          <div className='mb-4'>
            {errorMsg && <p className={'text-red-600'}>{errorMsg}</p>}
          </div>
          <button
            className='max-w-max items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'
            onClick={() => handleLogin()}
            id={'login-button'}
          >
            <LoginIcon className='w-5 h-5' />
            Login
          </button>
          <p className={'my-8 relative border-b-2 w-full'}>
            <span className='absolute top-1/2 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/2 bg-white px-2 w-max'>
              or continue with
            </span>
          </p>
          <a
            href='/sso'
            id={'sso-button'}
            className={
              'bg-blue-500 py-2 px-4 mt-5 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'
            }
          >
            Single Sign On
          </a>
        </div>
      </div>
    </DefaultLayout>
  );
}
