import { PlusCircleIcon } from '@heroicons/react/outline';
import React from 'react';

export default function SaveBtn({ id }) {
  return (
    <button
      className='inline-flex justify-center items-center gap-2 text-blue-400 rounded-l-lg rounded-r-3xl hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white py-1 pl-1 font-medium pr-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
      title='save course'
    >
      <PlusCircleIcon className='h-5 w-5' />
      Save
    </button>
  );
}
