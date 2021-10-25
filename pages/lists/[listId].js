import { useRouter } from 'next/router';
import useUserList from 'hooks/useUserList';
import React from 'react';
import DefaultLayout from '../../components/layouts/DefaultLayout';

export default function ViewList() {
  const router = useRouter();
  console.log(router.query);
  const { data } = useUserList(router.query.listId);

  return <DefaultLayout footerLocation='absolute'>
    
    <div className='pt-32'></div>
    { JSON.stringify( data ) }</DefaultLayout>;
}
