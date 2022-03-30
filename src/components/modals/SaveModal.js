import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateUserList } from '@/hooks/useCreateUserList';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import InputField from '@/components/inputs/InputField';
import { useEffect } from 'react';
import useField from '@/hooks/useField';

/**
 * TODO: to be removed before merging back to dev
 * Current status: in the process of trying to get the updated isSuccess ( useCreateUserList hook) value
 * to be used to determine whether or not xAPISendStatement should be executed.
 * Even with the useCallback, it seems like isSuccess (useCreateUserList hook) is still one step behind.
 *
 * The reason for using this approach instead of calling the xAPISendStatement in the onSuccess is
 * because testing that onSuccess is difficult especially when the mutation is being mocked.
 *
 */

export default function SaveModal({ courseId }) {
  // authentication
  const { user } = useAuth();

  // user lists
  const { data: userLists, isSuccess } = useUserOwnedLists();
  const { mutate } = useUpdateUserList(user?.token);
  const { mutate: create, isSuccess: createSuccess } = useCreateUserList(
    user?.token
  );

  // new list form
  const [fields, setFields] = useState({
    name: '',
    description: '',
  });

  const { fields: error, updateKeyValuePair: setError } = useField({
    message: '',
  });

  //xAPI Statement
  const xAPISendStatement = (data) => {
    if (user) {
      const verb = {
        id: 'https://w3id.org/xapi/dod-isd/verbs/curated',
        display: 'curated',
      };

      const domain = new URL(window.location);
      const objectId = `${domain.origin}/lists`;
      const resultExtName =
        'https://w3id.org/xapi/ecc/result/extensions/CuratedListId';

      const obj = {
        id: objectId,
        definitionName: data.name,
        description: data.description,
      };

      sendStatement(user.user, verb, obj, resultExtName, data.id);
    }
  };

  const xAPICall = useCallback(
    (fields) => {
      if (user && createSuccess) {
        xAPISendStatement(fields);
      }
    },
    [createSuccess === true, user, fields]
  );

  // add a course to the selected list
  const addCourseToList = useCallback(
    (listId) => {
      const listData = userLists.find((list) => list.id === listId);
      listData.experiences.push(courseId);
      mutate({ listData: listData, id: listId });
    },
    [courseId, mutate, userLists]
  );

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
        title='save course'
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
                          key={list.id}
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

                <form
                  className='my-2 flex flex-col w-full'
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (fields.name === '') {
                      setError('message', 'List name is required.');
                    } else if (fields.description === '') {
                      setError('message', 'List descrition is required.');
                    } else {
                      setError('message', '');
                      setFields({ name: '', description: '' });
                      create({ form: fields });
                      xAPICall(fields);
                    }
                  }}
                >
                  <div>
                    <label>List Name</label>
                    <InputField
                      placeholder='Name'
                      type='text'
                      name='name'
                      id='name'
                      value={fields.name}
                      onChange={(event) => {
                        setFields((prev) => ({
                          ...prev,
                          [event.target.name]: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className='relative'>
                    <label>List Description</label>
                    <textarea
                      placeholder='List Description...'
                      name='description'
                      id='description'
                      rows={Math.max(
                        fields.description?.length / 72,
                        2
                      ).toString()}
                      value={fields.description || ''}
                      onChange={(event) => {
                        setFields((prev) => ({
                          ...prev,
                          [event.target.name]: event.target.value,
                        }));
                      }}
                      className='w-full border outline-none rounded-md shadow focus:shadow-md p-2 focus:ring-4 ring-blue-400 transform transition-all duration-150'
                    />
                  </div>
                  <p className='text-red-600 mb-5'>{error.message}</p>
                  <input
                    type='submit'
                    name='submit'
                    value='Create'
                    className='text-blue-500 bg-blue-50 border-blue-400 border-2 rounded-md px-2 py-1 self-end transform transition-all duration-150 ease-in-out hover:bg-blue-400 hover:text-gray-50 cursor-pointer hover:shadow-md'
                  />
                </form>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    Close
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
