import { ExternalLinkIcon } from "@heroicons/react/outline";
import React from 'react';

export default function ExternalBtn({ url }) {
  return (
    <a
      href={ url }
      rel="noreferrer"
      target="_blank"
      id={'external-course-button'}
      className='cursor-pointer flex justify-center items-center gap-2 text-blue-400 rounded-full hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white p-1.5 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
      title='view course'
    >
      <ExternalLinkIcon className='h-5 w-5' />
    </a>
  );
}