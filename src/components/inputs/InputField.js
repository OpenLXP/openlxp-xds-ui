import React from 'react';

export default function InputField({
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      name={name}
      className='shadow focus:shadow-md rounded-md p-2 w-full border border-gray-200 text-gray-700 focus:ring-2 ring-blue-400 outline-none  transition-all  duration-200'
    />
  );
}
