export default function SearchField({
  onClick,
  placeholder,
  value,
  onChange,
  onKeyPress,
}) {
  return (
    <div className="flex flex-row bg-white items-center appearance-none w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm">
      <div className="cursor-pointer flex items-center text-icon-blue">
        <ion-icon
          name="search-outline"
          onClick={onClick}
          data-testid="search-button"
        />
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        // type={props.type}
        className="ml-1 pl-1 w-full focus:outline-none placeholder-gray-400"
      />
    </div>
  );
}
