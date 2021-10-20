import React from 'react';

export default function ActionButton({ onClick, id, children }) {
  return (
    <button
      className='items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white pl-2 pr-4 py-2 mt-4 transform transition-all duration-150 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  );
}
