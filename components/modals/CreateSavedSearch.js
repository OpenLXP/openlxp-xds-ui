import { Popover, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCreateSaveSearch } from '../../hooks/useCreateSaveSearch';
import useField from '../../hooks/useField';
import ActionButton from '../buttons/ActionButton';
import InputField from '../inputs/InputField';

export default function CreateSavedSearchModal({ path }) {
  const { user } = useAuth();
  const { fields, updateKeyValuePair, resetKey } = useField({
    name: '',
  });
  const { mutate, isSuccess } = useCreateSaveSearch(user?.token);

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  const createSavedSearch = () => {
    // list must me named
    if (fields.name && fields.name !== '') {
      mutate({ name: fields.name, path: path });
      resetKey('name');
    }
  };

  return (
    <div>
      <Popover className='relative'>
        <Popover.Button className='flex self-end w-full justify-end pr-5'>
          <span className='italic text-sm font-sans text-blue-400 hover:underline hover:text-blue-500'>
            Save this search
          </span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute right-0 z-20 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-3xl'>
            <div className='flex bg-white rounded-md shadow-md px-2 py-2 items-center gap-2'>
              <InputField
                placeholder='Query Name'
                value={fields.name}
                type='text'
                name='name'
                onChange={handleChange}
              />
              <ActionButton onClick={createSavedSearch}>
                {isSuccess && <CheckCircleIcon className='h-4 w-4' />}
                Save
              </ActionButton>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}