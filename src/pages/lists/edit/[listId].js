import {
  CheckCircleIcon,
  RefreshIcon,
  UploadIcon,
  XCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';


// components
import ActionButton from '@/components/buttons/ActionButton';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import UserListResult from '@/components/cards/UserListEditResult';

// contexts
import { useAuth } from '@/contexts/AuthContext';

// hooks
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserList } from '@/hooks/useUserList';

// utilities
import prepareListDataToSend from '@/utils/prepListDataToSend';

export default function EditList() {
  const router = useRouter();
  const { user } = useAuth();
  const list = useUserList(parseInt(router.query.listId));

  // handles the mutation
  const mutation = useUpdateUserList(user?.token);

  // single source of truth for editing
  const [currentListInfo, setCurrentListInfo] = useState({});

  // when the state of the data updates
  const memoData = useMemo(() => {
    // if success populate the data
    if (list.isSuccess) {
      setCurrentListInfo({
        name: list?.data.name,
        description: list?.data?.description,
        experiences: list?.data?.experiences,
      });
    }
  }, [list.isSuccess]);

  const handleChange = (event) => {
    setCurrentListInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // filters through the available courses
  const handleCourseRemoval = (id) => {
    setCurrentListInfo((prev) => {
      return {
        ...prev,
        experiences: prev.experiences.filter(
          (exp) => exp.meta.metadata_key_hash !== id
        ),
      };
    });
  };

  return (
    <DefaultLayout footerLocation='absolute'>
      <div className='pt-32 pb-20'>
        <h1 className='font-sans font-semibold text-3xl pb-4 mb-8 border-b'>
          {list?.data?.name}
        </h1>
        <input
          placeholder='List Name'
          className='w-1/2 border outline-none rounded-md shadow focus:shadow-md p-2 my-4 focus:ring-4 ring-blue-400 transform transition-all duration-150'
          name='name'
          value={currentListInfo.name || ''}
          onChange={handleChange}
        />
        <div className='relative mb-4 mt-2'>
          <textarea
            placeholder='List Description...'
            name='description'
            id='description'
            rows={Math.max(
              currentListInfo.description?.length / 72,
              4
            ).toString()}
            value={currentListInfo.description || ''}
            onChange={handleChange}
            className='w-full border outline-none rounded-md shadow focus:shadow-md p-2 focus:ring-4 ring-blue-400 transform transition-all duration-150'
          />
          <span
            className={`absolute bottom-2 right-3 ${
              currentListInfo.description?.length > 200
                ? 'text-red-500'
                : 'text-gray-500'
            }`}
          >
            {currentListInfo.description?.length}/200
          </span>
        </div>
        <div
          id='course-list'
          className='grid divide-y border rounded-md overflow-hidden shadow'
        >
          <div className='grid grid-cols-6 bg-gray-50 h-12 items-center px-2 font-sans font-semibold'>
            <div className='col-span-3'>Course Title</div>
            <div className='col-span-2'>Course Provider</div>
          </div>
          <div className='max-h-96 overflow-y-auto custom-scroll'>
            {list.isSuccess &&
              currentListInfo?.experiences?.map((course, index) => {
                return (
                  <div
                    key={course.meta.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <UserListResult
                      result={course}
                      onRemove={handleCourseRemoval}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className='flex justify-between items-center w-full mt-8'>
          <ActionButton
            onClick={() => {
              mutation.mutate({
                listData: prepareListDataToSend(currentListInfo),
                id: parseInt(router.query.listId),
              });
            }}
          >
            {mutation.isIdle && <UploadIcon className='h-5 w-5' />}
            {mutation.isSuccess && <CheckCircleIcon className='h-5 w-5' />}
            {mutation.isLoading && <RefreshIcon className='h-5 w-5' />}
            {mutation.isError && <XCircleIcon className='h-5 w-5' />}
            Update
          </ActionButton>
          <button
            onClick={() => {
              setCurrentListInfo(list.data);
            }}
            className='items-center inline-flex gap-2 text-gray-500 rounded-md hover:shadow-md bg-gray-50 hover:bg-gray-400 hover:text-white px-4 py-2 transform transition-all duration-150 ease-in-out border-gray-400 border-2 outline-none focus:ring-2 ring-gray-400'
          >
            <XIcon className='h-5 w-5' />
            Cancel
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
