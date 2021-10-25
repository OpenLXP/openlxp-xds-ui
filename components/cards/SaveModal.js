import { Dialog, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Fragment } from 'react';

export default function SaveModal({ id, modalState, closeModal }) {
  const { user } = useAuth();

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
                Save Course
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  This course will be saved for later.
                </p>
                <p className='text-sm text-gray-500'>Course ID: {id}</p>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  className='m-2 inline-flex text-blue-400 rounded hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 pl-1 font-medium pr-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
                  onClick={closeModal}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='m-2 inline-flex text-blue-400 rounded hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 pl-1 font-medium pr-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
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
