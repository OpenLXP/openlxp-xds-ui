import { Menu, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsIcon, PencilIcon, UserIcon } from '@heroicons/react/solid';

export default function UserMenu() {
  const {
    user: {
      user: { email },
    },
    logout,
  } = useAuth();
  return (
    <Menu as='div' className='relative inline-block text-left mt-0.5'>
      <div className='flex flex-col gap-2'>
        <Menu.Button className='inline-flex justify-end items-center max-w-md  bg-blue-500 px-2 py-1 text-white gap-2 font-semibold rounded-md outline-none focus:ring-2 ring-blue-400'>
          <div className='line-clamp-1'>{email}</div>
          <div
            id='avatar'
            className='h-10 w-10 rounded-full flex-shrink-0 bg-white shadow-inner-sm overflow-hidden flex justify-center items-center'
          >
            <UserIcon className='h-7 w-7 text-blue-500 text-shadow' />
          </div>
          {/* <ChevronDownIcon className='h-4 w-4' /> */}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 top-14 origin-top-right w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-gray-50 outline-none'>
          <div className='p-1 text-gray-700'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={`hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2`}
                >
                  <LogoutIcon className='h-4 w-4' />
                  Logout
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={`hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2`}
                >
                  <AdjustmentsIcon className='h-4 w-4' />
                  Profile
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
