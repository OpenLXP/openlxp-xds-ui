import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import {
  containsLowercase,
  containsNumber,
  containsSpace,
  containsSpecialCharacter,
  containsUppercase,
  isLongEnough,
  isValidEmail,
} from '@/utils/validation';
import { unstable_batchedUpdates } from 'react-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmationPassword: '',
    first_name: '',
    last_name: '',
  });
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [confPasswordError, setConfPasswordError] = useState(true);
  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    if (email === '') {
      return unstable_batchedUpdates(() => {
        setEmailError(true);
        setError('Email is required');
      });
    }

    if (!isValidEmail(email)) {
      return unstable_batchedUpdates(() => {
        setEmailError(true);
        setError('Email is invalid');
      });
    }

    return unstable_batchedUpdates(() => {
      setEmailError(false);
      setError('');
    });
  };
  const validatePassword = (password) => {
    if (password === '') {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password is required');
      });
    }

    if (!isLongEnough(password, 8)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must be at least 8 characters');
      });
    }

    if (!containsLowercase(password)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must contain at least one lowercase letter');
      });
    }

    if (!containsUppercase(password)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must contain at least one uppercase letter');
      });
    }

    if (!containsSpecialCharacter(password)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must contain at least one special character');
      });
    }

    if (!containsNumber(password)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must contain at least one number');
      });
    }

    if (containsSpace(password)) {
      return unstable_batchedUpdates(() => {
        setPasswordError(true);
        setError('Password must not contain any spaces');
      });
    }

    return unstable_batchedUpdates(() => {
      setPasswordError(false);
      setError('');
    });
  };

  const validateConfPassword = (confPassword) => {
    if (confPassword === '') {
      return unstable_batchedUpdates(() => {
        setConfPasswordError(true);
        setError('Confirmation password is required');
      });
    }

    if (confPassword !== credentials.password) {
      return unstable_batchedUpdates(() => {
        setConfPasswordError(true);
        setError('Passwords do not match');
      });
    }

    return unstable_batchedUpdates(() => {
      setConfPasswordError(false);
      setError('');
    });
  };

  const validateName = (name, updateFn) => {
    // test that a name is not empty

    if (!isLongEnough(name, 2)) {
      return unstable_batchedUpdates(() => {
        updateFn(true);
        setError('Name must be at least 2 characters');
      });
    }

    // no special characters
    if (containsSpecialCharacter(name)) {
      return unstable_batchedUpdates(() => {
        updateFn(true);
        setError('Name cannot contain special characters');
      });
    }

    return unstable_batchedUpdates(() => {
      updateFn(false);
      setError('');
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table(credentials);
  };

  const handleUpdateCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  // updaters for each field
  useEffect(() => {
    validatePassword(credentials.password);
  }, [credentials.password]);

  useEffect(() => {
    validateConfPassword(credentials.confirmationPassword);
  }, [credentials.confirmationPassword]);

  useEffect(() => {
    validateEmail(credentials.email);
  }, [credentials.email]);

  useEffect(() => {
    validateName(credentials.last_name, setLastNameError);
  }, [credentials.last_name]);

  useEffect(() => {
    validateName(credentials.first_name, setFirstNameError);
  }, [credentials.first_name]);

  return (
    <DefaultLayout>
      <>
        <div className='text-center mt-20'>
          <Image src={logo} alt='logo' width={150} height={150} />
          <h1 className='font-bold text-2xl'>Create your account</h1>
          <p>
            or&nbsp;
            <Link href={'/login'} passHref>
              <button className='text-blue-400 hover:text-blue-600 hover:text-shadow'>
                Sign in to your account
              </button>
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='mt-10 w-[38rem] mx-auto bg-white px-20 py-8 shadow-md rounded-md flex flex-col justify-center items-center'
        >
          <div className='w-full flex gap-4'>
            <input
              onChange={handleUpdateCredentials}
              value={credentials.first_name}
              type='text'
              name='first_name'
              placeholder='First Name'
              className='w-1/2 rounded p-2 mt-4 shadow'
              required
            />
            <input
              onChange={handleUpdateCredentials}
              value={credentials.last_name}
              type='text'
              name='last_name'
              placeholder='Last Name'
              className='w-1/2 rounded p-2 mt-4 shadow'
              required
            />
          </div>
          <input
            onChange={handleUpdateCredentials}
            value={credentials.email}
            type='email'
            name='email'
            placeholder='Email'
            className='w-full rounded p-2 mt-4 shadow'
            required
          />
          <input
            onChange={handleUpdateCredentials}
            value={credentials.password}
            type='password'
            name='password'
            placeholder='Password'
            className='w-full rounded p-2 mt-4 shadow'
            required
          />
          <input
            onChange={handleUpdateCredentials}
            value={credentials.confirmationPassword}
            type='password'
            name='confirmationPassword'
            placeholder='Confirm Password'
            className='w-full rounded p-2 mt-4 shadow'
            required
          />
          <div className='text-gray-500 mt-2'>
            <h4 className='text-center font-semibold'>
              New Account Requirements
            </h4>
            <div className='text-xs'>
              <p
                className={`${
                  firstNameError || lastNameError
                    ? 'text-red-400'
                    : 'text-green-600'
                } flex`}
              >
                {firstNameError || lastNameError ? (
                  <XCircleIcon className='inline-block h-4 w-4 mr-2' />
                ) : (
                  <CheckCircleIcon className='inline-block h-4 w-4 mr-2' />
                )}
                First & Last Name must be at least 2 characters long
              </p>
              <p
                className={`${
                  emailError ? 'text-red-400' : 'text-green-600'
                } flex`}
              >
                {emailError ? (
                  <XCircleIcon className='inline-block h-4 w-4 mr-2' />
                ) : (
                  <CheckCircleIcon className='inline-block h-4 w-4 mr-2' />
                )}
                Email must be valid
              </p>
              <p
                className={`${
                  passwordError ? 'text-red-400' : 'text-green-600'
                }`}
              >
                {passwordError ? (
                  <XCircleIcon className='inline-block h-4 w-4 mr-2' />
                ) : (
                  <CheckCircleIcon className='inline-block h-4 w-4 mr-2' />
                )}
                Password must be at least 8 characters long and contain at least
                one of each:
                <ul className='pl-6 list-disc list-inside'>
                  <li>Uppercase letter</li>
                  <li>Lowercase letter</li>
                  <li>Special character</li>
                  <li>Number</li>
                </ul>
              </p>
              <p
                className={`${
                  confPasswordError || passwordError
                    ? 'text-red-400'
                    : 'text-green-600'
                }`}
              >
                {confPasswordError || passwordError ? (
                  <XCircleIcon className='inline-block h-4 w-4 mr-2' />
                ) : (
                  <CheckCircleIcon className='inline-block h-4 w-4 mr-2' />
                )}
                Confirmation Password must match
              </p>
            </div>
          </div>
          <p>{error}</p>
          <button
            type='submit'
            className='items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transition-all duration-75 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400 max-w-max'
          >
            Create Account
          </button>
        </form>
      </>
    </DefaultLayout>
  );
}
