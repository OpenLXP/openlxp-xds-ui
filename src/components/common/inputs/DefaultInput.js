/**
 * @param { function } handleChange - Function to handle updates
 * @param { string } className - Styling override
 * @param { string, boolean} error - Error state for the component
 * @param { string } placeholder - Placeholder for the input
 * @param { string } type - Type of the input
 */

const DefaultInput = (props) => {
  let style =
    props.error === null || props.error === ""
      ? `appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-blue focus:border-base-blue ${props.className}`
      : `appearance-none block w-full px-3 py-2 border ring-red-500 border-red-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-blue focus:border-base-blue ${props.className}`;

  return (
    <div>
      <input
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        className={style}
        required
      />
    </div>
  );
};
export default DefaultInput;
