export default function Button({ title, onClick, children }) {
  return (
    <div
      className="py-1 px-3 text-center shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base font-medium hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
      onClick={onClick}>
      {children}
    </div>
  );
}
