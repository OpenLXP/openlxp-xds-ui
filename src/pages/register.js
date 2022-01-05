import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserAddIcon } from '@heroicons/react/outline';

// components
import ActionButton from '@/components/buttons/ActionButton';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import InputField from '@/components/inputs/InputField';
import logo from '@/public/logo.png';

// contexts
import { useAuth } from '@/contexts/AuthContext';

// hooks
import useField from '@/hooks/useField';

import {
  containsLowercase,
  containsSpecialCharacter,
  containsUppercase,
  isLongEnough,
  isValidEmail
} from '@/utils/validation';
import { authRegister } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';

// config

export default function Register() {
  const router = useRouter();

  const { fields: credentials, updateKeyValuePair: setCredential } = useField({
    email: '',
    password: '',
    confirmationPassword: '',
    first_name: '',
    last_name: ''
  });

  const { fields: error, updateKeyValuePair: setError } = useField({
    message: ''
  });

  const setCredentials = (event) => {
    setCredential(event.target.name, event.target.value);
  };

  const { register, logout } = useAuth();

  // TODO: Should rename to validateRegistration
  const registerUser = () => {
    // verify email is not empty
    if (credentials.email === '') {
      setError('message', 'Email is required');
    } else if (!isValidEmail(credentials.email)) {
      setError('message', 'Email is invalid');
    }
    // verify password
    else if (credentials.password === '') { // not empty
      setError('message', 'Password is required');
    } else if (!isLongEnough(credentials.password, 8)) {
      setError('message', 'Password must be at least 8 characters');
    } else if (!containsLowercase(credentials.password)) {
      setError('message', 'Password must contain at least one lowercase letter');
    } else if (!containsUppercase(credentials.password)) {
      setError('message', 'Password must contain at least one uppercase letter');
    } else if (!containsSpecialCharacter(credentials.password)) {
      setError('message', 'Password must contain at least one special character');
    }
    // verify password confirmation
    else if (credentials.confirmationPassword === '') { // not empty
      setError('message', 'Password confirmation is required');
    } else if (credentials.confirmationPassword !== credentials.password) {
      setError('message', 'Password confirmation does not match password');
    }
    // verify first name
    else if (credentials.first_name === '') {
      setError('message', 'First name is required');
    } else if (!isLongEnough(credentials.first_name, 2)) {
      setError('message', 'First name must be at least 2 characters');
    }
    // verify last name
    else if (credentials.last_name === '') {
      setError('message', 'Last name is required');
    } else if (!isLongEnough(credentials.last_name, 2)) {
      setError('message', 'Last name must be at least 2 characters');
    }
    // if no errors, register
    else {
      axiosInstance
        .post(authRegister, credentials)
        .then((res) => {
          register(res.data);
          router.push('/');
        })
        .catch((error) => {
          setError('message', error.message || 'There was an error during registration');
        });
    }
  };

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className={'pt-32'}>
        <div className='mt-10 mx-52 flex flex-col items-center justify-between'>
          <Image src={logo} alt={'home'} height={'100'} width={'100'} />
          <p className='mt-2 text-2xl font-extrabold'>Create your account</p>
          <span>
            or &nbsp;
            <Link href={'/login'} passHref>
              <button
                id={'create-account-button'}
                className='text-blue-400 hover:underline hover:text-blue-500 cursor-pointer transition-all duration-150 ease-in-out'
              >
                Sign in to your account
              </button>
            </Link>
          </span>
        </div>
        <div
          className='w-1/2 p-8 mx-auto mt-10 bg-white flex flex-col items-center justify-between shadow-md rounded-md'>
          <div className='space-y-4 mb-8 w-full'>
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
            <InputField
              type={'password'}
              placeholder={'Confirm Password'}
              name={'confirmationPassword'}
              onChange={(event) => setCredentials(event)}
            />
            <div className='flex gap-4'>
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
            </div>
          </div>
          <p className='text-red-600 mb-5'>{error.message}</p>
          <ActionButton onClick={() => registerUser()} id='create-account-button'>
            <UserAddIcon className='h-5 w-5' />
            Create
          </ActionButton>
          <p className={'my-8 relative border-b-2 w-full'}>
            <span
              className='absolute top-1/2 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/2 bg-white px-2 w-max'>
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
    </DefaultLayout>
  );
}
