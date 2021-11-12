export default function InputField({ type, name, placeholder, onChange, id }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-blue focus:border-base-blue"
    />
  );
}
