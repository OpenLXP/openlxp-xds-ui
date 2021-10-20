import { useAuth } from '../contexts/AuthContext';
import useField from '../hooks/useField';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserAddIcon } from '@heroicons/react/outline';

import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';
import InputField from '../components/inputs/InputField';

export default function Register() {
  const { fields: credentials, updateKeyValuePair: setCredential } = useField({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const { fields: error, updateKeyValuePair: setError } = useField({
    message: '',
  });

  const setCredentials = (event) => {
    setCredential(event.target.name, event.target.value);
  };

  const { register } = useAuth();

  // TODO: Should rename to validateRegistration
  const doRegister = () => {
    // Might consider separation of concerns
    if (
      credentials.email === '' ||
      credentials.password === '' ||
      credentials.first_name === '' ||
      credentials.last_name === ''
    ) {
      setError('message', 'All fields are required');
    } else if (!credentials.email.includes('@')) {
      setError('message', 'Must be a valid email');
    } else if (credentials.password.length < 8) {
      setError('message', 'Password must be a minimum of 8 characters');
    } else {
      register(credentials);
    }
  };

  return (
    <>
      <div className={'pt-32'}>
        <div
          className={'mt-10 mx-52 flex flex-col items-center justify-between'}
        >
          <Image src={logo} alt={'home'} height={'100'} width={'100'} />
          <p className='mt-2 text-2xl font-extrabold'>Create your account</p>
          <Link href={'/login'}>
            <p
              id='login-button'
              className='text-blue-600 text-base underline hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out'
            >
              Sign in to your Account
            </p>
          </Link>
        </div>
        <div className='w-1/3 p-8 mx-auto mt-10 bg-white flex flex-col items-center justify-between shadow-md rounded-md'>
          <InputField
            type='text'
            required={true}
            name='first_name'
            placeholder='First Name'
            onChange={(event) => setCredentials(event)}
          />
          <InputField
            type='text'
            required={true}
            name='last_name'
            onChange={(event) => setCredentials(event)}
            placeholder='Last Name'
          />
          <InputField
            type={'text'}
            placeholder={'Email'}
            name={'email'}
            onChange={(event) => setCredentials(event)}
          />
          <InputField
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            onChange={(event) => setCredentials(event)}
          />
          <p className='text-red-600'>{error.message}</p>
          <button
            className='items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white pl-2 pr-4 py-2 mt-4 transform transition-all duration-150 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'
            onClick={() => doRegister()}
            id='create-account-button'
            alt='create account'
          >
            <UserAddIcon className='h-5 w-5' />
            Create
          </button>
          <p className={'my-8 relative border-b-2 w-full'}>
            <span className='absolute top-1/2 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/2 bg-white px-2 w-max'>
              or continue with
            </span>
          </p>
          <Link href={'/sso'}>
            <a
              id={'sso-button'}
              className='bg-blue-500 py-2 px-4 mt-5 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'
            >
              Single Sign On
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
