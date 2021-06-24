/**
 *
 * @param { function } handleSearch - What happens when search is clicked
 * @param { function } handleEnterKey -  What happens when enter key is pressed
 * @param { function } handleChange -  Updates the query on change
 * @param { string } queryValue - The search value
 * @param { string } placeholder - The placeholder text
 */

const SearchInput = (props) => {
  return (
    <div className="flex flex-row bg-white items-center appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm">
      <div className="cursor-pointer flex items-center">
        <ion-icon name="search-outline" onClick={props.handleSearch} />
      </div>
      <input
        value={props.queryValue}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onKeyPress={props.handleEnter}
        className="ml-1 pl-1 w-full focus:outline-none placeholder-gray-400 hover:shadow-sm"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default SearchInput;
