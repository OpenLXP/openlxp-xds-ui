import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import SaveModal from '../cards/SaveModal';

export default function SaveBtn({ id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='inline-flex justify-center items-center gap-2 text-blue-400 rounded-l-lg rounded-r-3xl hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 pl-1 font-medium pr-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
        title='save course'
        onClick={() => setShowModal(!showModal)}
      >
        <PlusCircleIcon className='h-6 w-6' />
        Save
      </button>
      {showModal && (
        <SaveModal
          id={id}
          modalState={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
}
