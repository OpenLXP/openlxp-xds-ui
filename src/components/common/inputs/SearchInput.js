/**
 *
 * @param { function } handleSearch - What happens when search is clicked
 * @param { function } handleEnter -  What happens when enter key is pressed
 * @param { function } handleChange -  Updates the query on change
 * @param { string } queryValue - The search value
 * @param { string } placeholderText - The placeholder text
 */

const SearchInput = (props) => {
  const style = `flex flex-row bg-white items-center appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm ${props.className}`;
  return (
    <div className={style}>
      <div className="cursor-pointer flex items-center text-icon-blue">
        <ion-icon
          name="search-outline"
          onClick={props.handleSearch}
          data-testid="search-button"
        />
      </div>
      <input
        type="text"
        value={props.queryValue}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onKeyPress={props.handleEnter}
        // type={props.type}
        className="ml-1 pl-1 w-full focus:outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default SearchInput;
