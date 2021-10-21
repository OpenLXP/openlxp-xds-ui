import { useAuth } from '../contexts/AuthContext';
import useField from '../hooks/useField';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginIcon } from '@heroicons/react/outline';

import logo from '../public/United_States_Department_of_Defense_Seal.svg.png';
import InputField from '../components/inputs/InputField';
import ActionButton from '../components/buttons/ActionButton';
import axios from 'axios';
import { authLogin } from '../config/endpoints';
import router from 'next/router';

export default function Login() {
  const { login, logout } = useAuth();
  const { fields: credentials, updateKeyValuePair } = useField({
    username: '',
    password: '',
  });
  const setCredentials = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };
  const [errorMsg, setErrorMsg] = useState();

  const doLogin = () => {
    if (credentials.username === '' || credentials.password === '') {
      setErrorMsg('All fields required');
    } else if (!credentials.username.includes('@')) {
      setErrorMsg('Username must be an email');
    } else {
      axios
        .post(authLogin, credentials)
        .then((res) => {
          login(res.data);
          router.push('/');
        })
        .catch((error) => {
          logout();
          setErrorMsg('Invalid credentials');
        });
      // login(credentials);
      // setErrorMsg(null);
    }
  };

  // const doLogin = () => {
  //   if (credentials.username === '' || credentials.password === '') {
  //     setError(true);
  //   } else {
  //     login(credentials);
  //   }
  // };

  return (
    <>
      <div className={'py-32'}>
        <div className='mt-10 mx-52 flex flex-col items-center justify-between'>
          <Image src={logo} alt={'home'} height={'100'} width={'100'} />
          <p className={'mt-2 text-2xl font-extrabold '}>
            Sign in to your account
          </p>
          <span>
            or &nbsp;
            <Link href={'/register'}>
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
          <InputField
            type='text'
            value={credentials.username}
            placeholder={'Username'}
            name={'username'}
            onChange={(event) => setCredentials(event)}
          />
          <InputField
            type={'password'}
            value={credentials.password}
            placeholder={'Password'}
            name={'password'}
            onChange={(event) => setCredentials(event)}
          />
          <Link href={'/forgotPassword'}>
            <button
              id={'forgot-password-button'}
              className='text-blue-400 hover:text-blue-500 hover:underline text-left self-start -mt-2 mb-2 ml-1 transform transition-all duration-150 ease-in-out cursor-pointer'
            >
              Forgot Password
            </button>
          </Link>
          {errorMsg && <p className={'text-red-600'}>{errorMsg}</p>}
          <ActionButton onClick={() => doLogin()} id={'login-button'}>
            <LoginIcon className='w-5 h-5' />
            Login
          </ActionButton>
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
