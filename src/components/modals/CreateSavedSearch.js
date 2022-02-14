import { CheckCircleIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateSaveSearch } from '@/hooks/useCreateSaveSearch';
import ActionButton from '@/components/buttons/ActionButton';
import InputField from '@/components/inputs/InputField';
import useField from '@/hooks/useField';

export default function CreateSavedSearchModal({ path }) {
  const { user } = useAuth();
  const { fields, updateKeyValuePair, resetKey } = useField({
    name: '',
  });
  const { mutate, isSuccess } = useCreateSaveSearch(user?.token);

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

    //xAPI Statement
    const xAPISendStatement = (objectId, savedTerm) => {
      if (user) {
        const verb = {
          id: "https://w3id.org/xapi/tla/verbs/prioritized",
          display: "prioritized"
        }
        const objectDefName = "ECC Search Term Saving"
        const resultExtKey = "https://w3id.org/xapi/ecc/result/extensions/SavedSearchTerm";
  
        sendStatement(user.user, verb, objectId, objectDefName, resultExtKey, savedTerm);
      }
    }

  const createSavedSearch = () => {
    // list must me named
    if (fields.name && fields.name !== '') {
      mutate({ name: fields.name, path: path }, { onSuccess: (data) => {
        console.log(new URLSearchParams(data.query).get('/search?keyword'))
        const domain = (new URL(window.location))
        const objectId = `${domain.origin}/search`
        xAPISendStatement(objectId, new URLSearchParams(data.query).get('/search?keyword'))
      }});
      resetKey('name');
    }
  };

  return (
    <div>
      <Popover className='relative'>
        <Popover.Button className='flex self-end w-full justify-center pr-6 items-center'>
          <span className='italic text-sm font-sans text-blue-400 hover:underline hover:text-blue-500'>
            Save this search
          </span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-100'
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
              <Popover.Button>
                <ActionButton onClick={createSavedSearch}>
                  {isSuccess && <CheckCircleIcon className='h-4 w-4' />}
                  Save
                </ActionButton>
              </Popover.Button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
