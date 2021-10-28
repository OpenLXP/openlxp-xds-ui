import Link from 'next/link';
import { Fragment } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ArchiveIcon, BookmarkAltIcon, LogoutIcon, SaveIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { AdjustmentsIcon, UserIcon } from '@heroicons/react/solid';
import { CollectionIcon, BookmarkIcon } from '@heroicons/react/outline';

export default function UserMenu() {
  const {
    user: {
      user: { email },
    },
    logout,
  } = useAuth();
  return (
    <Menu as='div' className='relative inline-block text-left mt-0.5 max-w-min'>
      <div className=''>
        <Menu.Button className='inline-flex justify-end items-center max-w-md  bg-blue-500 hover:bg-opacity-95 hover:shadow transform transition-all ease-in-out duration-150 px-2 py-1 text-white gap-2 font-semibold rounded-md outline-none focus:ring-4 ring-blue-400'>
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
        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='p-1 text-gray-700'>
            <Menu.Item>
              {({ active }) => (
                <button
                  id='logout-button'
                  onClick={() => logout()}
                  className={`ring-red-200 hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2`}
                >
                  <LogoutIcon className='h-4 w-4' />
                  Logout
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href='/profile'>
                  <a>
                    <button className='hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2'>
                      <AdjustmentsIcon className='h-4 w-4' />
                      Profile
                    </button>
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href='/save-searches'>
                  <a>
                    <button className='hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2'>
                      <ArchiveIcon className='h-4 w-4' />
                      Saved Searches
                    </button>
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href='/lists/owned'>
                  <a>
                    <button
                      id={'my-lists'}
                      className={`hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2`}
                    >
                      <CollectionIcon className='h-4 w-4' />
                      My Lists
                    </button>
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href='/lists/subscribed'>
                  <a>
                    <button
                      id={'subscribed-lists'}
                      className={`hover:bg-gray-100 transition-colors duration-75 ease-in-out cursor-pointer rounded-md w-full text-left flex justify-start gap-2 items-center p-2`}
                    >
                      <BookmarkIcon className='h-4 w-4' />
                      Subscribed Lists
                    </button>
                  </a>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
