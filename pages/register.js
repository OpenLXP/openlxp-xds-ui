import DefaultLayout from 'components/layouts/DefaultLayout';
import { useAuth } from 'contexts/AuthContext';
import useField from 'hooks/useField';
import React from 'react';

export default function Register() {
  const [credentials, setCredentials] = useField({
    email: '', password: '', first_name: '', last_name: ''
  });
  const { register } = useAuth();

  return <DefaultLayout>
    <input type={'text'}
           placeholder={'first name'}
           name={'first_name'}
           onChange={event => setCredentials(event)}
    />
    <input type={'text'}
           placeholder={'last name'}
           name={'last_name'}
           onChange={event => setCredentials(event)}
    />
    <input type={'text'}
           placeholder={'email'}
           name={'email'}
           onChange={event => setCredentials(event)}
    />
    <input type={'password'}
           placeholder={'password'}
           name={'password'}
           onChange={event => setCredentials(event)}
    />
    <div onClick={() => register(credentials)}>register</div>
  </DefaultLayout>;
}
