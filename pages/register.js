import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserAddIcon } from '@heroicons/react/outline';

// components
import ActionButton from '../components/buttons/ActionButton';
import DefaultLayout from '../components/layouts/DefaultLayout';
import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';

// utils
import {
  containsLowercase,
  containsNumber,
  containsSpecialCharacter,
  containsUppercase,
  isLongEnough,
  isValidEmail
} from '../utils/validation';

// contexts
import InputField from 'components/inputs/InputField';


export default function Register() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    first_name: '',
    last_name: ''
  });
  // error message
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCredentials(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    validateRegistration();
  };

  // validate registration form
  const validateRegistration = () => {
    // remove spaces from each field
    const email = credentials.email.trim();
    const password = credentials.password.trim();
    const passwordConfirmation = credentials.passwordConfirmation.trim();
    const first_name = credentials.first_name.trim();
    const last_name = credentials.last_name.trim();

    // validate email
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    // validate password
    if (!isLongEnough(password, 8)) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!containsUppercase(password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!containsLowercase(password)) {
      setError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!containsNumber(password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (!containsSpecialCharacter(password)) {
      setError('Password must contain at least one special character');
      return false;
    }
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return false;
    }

    // validate first name
    if (!isLongEnough(first_name, 2)) {
      setError('First name must be at least 2 characters long');
      return false;
    }

    // validate last name
    if (!isLongEnough(last_name, 2)) {
      setError('Last name must be at least 2 characters long');
      return false;
    }

    // if all fields are valid, return true and reset error message
    setError('');
    return true;
  };


  return (
    <DefaultLayout footerLocation='fixed'>
      <div className={'py-32'}>
        <div className='mt-10 mx-52 flex flex-col items-center justify-between'>
          <Image src={logo} alt={'home'} height={'100'} width={'100'} />
          <p className='mt-2 text-2xl font-extrabold'>Create your account</p>
          <span>
            or &nbsp;
            <Link href={'/login'}>
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
          <div className='w-full flex flex-col gap-4'>
            {/* Email Field*/}
            <InputField
              label={'Email'}
              name={'email'}
              type={'email'}
              value={credentials.email}
              onChange={handleChange}
              placeholder={'Email'}
            />
            {/* Password Field */}
            <InputField
              label={'Password'}
              name={'password'}
              type={'password'}
              value={credentials.password}
              onChange={handleChange}
              placeholder={'Password'}
            />
            {/* Password Confirm Field*/}
            <InputField
              label={'Confirm Password'}
              name={'passwordConfirmation'}
              type={'password'}
              value={credentials.passwordConfirmation}
              onChange={handleChange}
              placeholder={'Confirm password'}
            />

            <div className='flex w-full gap-4'>
              {/* First Name Field */}
              <InputField
                label={'First Name'}
                name={'first_name'}
                type={'text'}
                value={credentials.first_name}
                onChange={handleChange}
                placeholder={'First name'}
              />
              {/* Last Name Field */}
              <InputField
                label={'Last Name'}
                name={'last_name'}
                type={'text'}
                value={credentials.last_name}
                onChange={handleChange}
                placeholder={'Last name'}
              />
            </div>
          </div>
          {/* Error Message */}
          <span className={`${error ? 'block' : 'invisible'} h-3 text-red-500 mt-5 mb-6`}>{error}</span>

          {/* Submit Button */}
          <ActionButton onClick={handleSubmit} id='create-account-button'>
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
  )
    ;
}
