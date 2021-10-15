import { SearchIcon, XIcon } from '@heroicons/react/solid';

export default function SearchBar({ parameters, onChange, onClick, onReset }) {
  const handleEnterKey = (event) => {
    if (event.key === 'Enter' || event.key === '13') onClick();
  };

  return (
    <div
      onKeyPress={(event) => handleEnterKey(event)}
      className={
        'w-full flex flex-row rounded-full shadow bg-white justify-center items-center focus-within:ring-4 ring-blue-400 focus-within:shadow-lg transform transition-all duration-150 ease-in-out z-10'
      }
    >
      <input
        id={'search-bar'}
        value={parameters.keyword}
        name={'keyword'}
        type={'text'}
        className={'w-full py-4 rounded-full outline-none pl-6'}
        onChange={onChange}
        autoComplete={'off'}
        placeholder={'Search the catalog'}
      />
      <div className={'inline-flex'}>
        <button
          id={'reset'}
          onClick={() => onReset('keyword')}
          className='outline-none focus:bg-gray-100 p-2 mr-2 text-gray-400 hover:text-blue-400 hover:text-shadow cursor-pointer rounded-full hover:bg-gray-100 w-min'
        >
          <XIcon className={'h-5 w-5'} />
        </button>
        <div className={'border-l'} />
        <button
          id={'search'}
          onClick={onClick}
          className='outline-none rounded-full ml-2 mr-4 p-2 focus:bg-gray-100 text-gray-400 hover:text-blue-400 hover:text-shadow cursor-pointer'
        >
          <SearchIcon className={'h-5 w-5'} />
        </button>
      </div>
    </div>
  );
}
