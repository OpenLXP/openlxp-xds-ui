import React, { useState } from 'react';
import DefaultLayout from '../../../components/layouts/DefaultLayout';
import { useAuth } from '../../../contexts/AuthContext';
import useUpdateUserList from '../../../hooks/useUpdateUserList';
import useUserList from '../../../hooks/useUserList';

export default function EditList({ id }) {
  const { user } = useAuth();
  const { data, isSuccess, isLoading, isError } = useUserList(id);

  const mutation = useUpdateUserList(user?.token);

  const formData = {
    // name: 'Test List 1',
    description: 'Test list 2',
    experiences: [
      '300ff07edb21c0c013d53c9e5c76fb96',
      '3241553c74928e80c1b82aca212c8e8a',
    ],
  };
  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-32'>{data?.name}</div>
      <div>{data?.description}</div>
      <button
        onClick={() => {
          mutation.mutate({ listData: formData, id: id });
        }}
      >
        submit
      </button>
      edit {id}
      <div>{mutation.isError.toString()}</div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async ({ query: { listId } }) => {
  console.log(listId);
  return {
    props: { id: parseInt(listId) },
  };
};
