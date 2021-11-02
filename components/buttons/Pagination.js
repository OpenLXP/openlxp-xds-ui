import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';

export const Pagination = ({ onNext, onPrevious, totalPages, currentPage }) => {
  return (
    <div className='flex flex-row justify-between'>
      <button
        onClick={onPrevious}
        className={`${
          currentPage > 1 ? 'block' : 'invisible'
        } flex justify-center items-center gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white pl-2 pr-4 py-2 transform transition-all duration-150 ease-in-out border-blue-300 border-2 outline-none focus:ring-2 ring-blue-300`}
      >
        <ChevronLeftIcon className='h-6 w-6' />
        Back
      </button>

      <button
        onClick={onNext}
        className={`${
          totalPages > currentPage ? 'block' : 'invisible'
        } flex justify-center items-center gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white pl-4 pr-2 py-2 transform transition-all duration-150 ease-in-out border-blue-300 border-2 outline-none focus:ring-2 ring-blue-300`}
      >
        Next
        <ChevronRightIcon className='h-6 w-6' />
      </button>
    </div>
  );
};
