const Dropdown = (props) => {
  const optionsList = props.options || [];
  const options = optionsList.map((option) => {
    return (
      <option value={option.value} className="">
        {option.label}
      </option>
    );
  });

  return (
    <div className="w-full px-2 border text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      <select
        onFo
        className="w-full py-1.5"
        onChange={props.onChange}
        placeholder={props.placeholder}
      >
        {options}
      </select>
    </div>
  );
};

export default Dropdown;
