import { Dialog, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Fragment, useState, useEffect } from 'react';
import useUserOwnedLists from '../../hooks/useUserOwnedLists';
import UserListResult from '../cards/UserListEditResult';
import { BookOpenIcon, UsersIcon } from '@heroicons/react/outline';
import useUpdateUserList from '../../hooks/useUpdateUserList';

export default function SaveModal({ id, modalState, closeModal }) {
  const { user } = useAuth();
  const lists = useUserOwnedLists(user?.token);
  const mutation = useUpdateUserList(user?.token);

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    setCurrentList(lists.data);
  }, [lists.data]);
  const handleUpdate = () => {};

  return (
    <Transition appear show={modalState} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-20' />

        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Your Lists
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Add this course to a list.
                </p>
                <p className='text-sm text-gray-500'>Course ID: {id}</p>
              </div>
              <div className='h-72 overflow-y-auto overflow-x-hidden custom-scroll px-1 bg-gray-50 rounded text-left'>
                {currentList?.map((list) => {
                  return <pre>{JSON.stringify(list, null, 2)}</pre>;
                })}
              </div>
              <div className='mt-4'>
                <button
                  type='button'
                  className='m-2 inline-flex text-blue-400 rounded hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 p-2 font-medium transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
                  onClick={closeModal}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='m-2 inline-flex text-blue-400 rounded hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 p-2 font-medium transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
