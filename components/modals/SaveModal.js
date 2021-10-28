import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateUserList } from '../../hooks/useUpdateUserList';
import { useUserOwnedLists } from '../../hooks/useUserOwnedLists';
import { PlusCircleIcon } from '@heroicons/react/outline';

export default function SaveModal({ courseId }) {
  // authentication
  const { user } = useAuth();

  // user lists
  const { data: userLists, isSuccess } = useUserOwnedLists(user?.token);
  const { mutate } = useUpdateUserList(user?.token);

  // add a course to the selected list
  const addCourseToList = (listId) => {
    const listData = userLists.find((list) => list.id === listId);
    listData.experiences.push(courseId);
    mutate({ listData: listData, id: listId });
  };

  // remove a course from the selected list
  const removeCourseFromList = (listId) => {
    const listData = userLists.find((list) => list.id === listId);
    const modified = {
      name: listData.name,
      description: listData.description,
      experiences: listData.experiences.filter((exp) => exp !== courseId),
    };
    mutate({ listData: modified, id: listId });
  };

  // modal states
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='inline-flex justify-center items-center gap-2 text-blue-400 rounded-r-lg rounded-l-3xl hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 pl-1 font-medium pr-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
      >
        <PlusCircleIcon className='h-6 w-6' />
        Save
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-700 bg-opacity-10' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Add course to lists
                </Dialog.Title>
                <div className='mt-2 w-full py-2 px-0.5 rounded-md overflow-y-auto h-56 custom-scroll border bg-gray-50 space-y-1'>
                  {isSuccess &&
                    userLists?.map((list) => {
                      const contained = list.experiences.includes(courseId);
                      return (
                        <div
                          className={` inline-flex justify-between w-full bg-white rounded-md py-2 px-1 border`}
                        >
                          {list.name}

                          {contained ? (
                            <button
                              className='bg-red-50 px-2 rounded border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transform transition-colors duration-100 ease-in-out'
                              onClick={() => {
                                removeCourseFromList(list.id);
                              }}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              className='bg-green-50 px-2 rounded border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transform transition-colors duration-100 ease-in-out'
                              onClick={() => {
                                addCourseToList(list.id);
                              }}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
