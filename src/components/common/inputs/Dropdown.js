const Dropdown = (props) => {
  const optionsList = props.options || [];
  const options = optionsList.map((option, index) => {
    return (
      <option value={option.value} className="" key={index}>
        {option.label}
      </option>
    );
  });

  return (
    <div className="w-full border text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      <select
        className="w-full py-1.5 px-1 rounded-md"
        onChange={props.onChange}
        placeholder={props.placeholder}
      >
        {options}
      </select>
    </div>
  );
};

export default Dropdown;
