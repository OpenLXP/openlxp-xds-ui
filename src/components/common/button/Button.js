export default function Button({ onClick, children, fontWeight }) {
  if (fontWeight) {
    return (
      <div
        className={`py-2 px-3 text-center shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out font-${fontWeight}`}
        onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`py-2 px-3 text-center shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out font-semibold`}
      onClick={onClick}>
      {children}
    </div>
  );
}
