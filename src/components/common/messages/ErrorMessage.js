/**
 * @param { string } className - overrides for the styling of the component
 * @param { string } error - the error message to display
 */

const ErrorMessage = (props) => {
  const style = `font-thin text-xs text-red-500 mt-1 ml-1 ${props.className}`;
  return <div className={style}>{props.error}</div>;
};

export default ErrorMessage;
