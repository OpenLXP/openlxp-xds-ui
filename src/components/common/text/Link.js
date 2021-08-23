export default function Link({ children, onClick, size = null }) {
  let style = "text-base-blue hover:text-bright-blue text-sm cursor-pointer";

  if (size) {
    return (
      <a onClick={onClick} className={`${style} text-${size}`}>
        {children}
      </a>
    );
  }
  return (
    <a
      onClick={onClick}
      className="text-base-blue hover:text-bright-blue cursor-pointer text-base">
      {children}
    </a>
  );
}
