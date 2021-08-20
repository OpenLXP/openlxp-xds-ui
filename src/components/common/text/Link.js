export default function Link({ children, onClick, size = null }) {
  let style = "text-base-blue hover:text-bright-blue text-sm cursor-pointer";

  switch (size) {
    case "lg":
      return (
        <a onClick={onClick} className={`${style} text-${size}`}>
          {children}
        </a>
      );
    case "md":
      return (
        <a onClick={onClick} className={`${style} text-${size}`}>
          {children}
        </a>
      );
    case "sm":
      return (
        <a onClick={onClick} className={`${style} text-${size}`}>
          {children}
        </a>
      );
    case "xs":
      return (
        <a onClick={onClick} className={`${style} text-${size}`}>
          {children}
        </a>
      );
    default:
      return (
        <a
          onClick={onClick}
          className="text-base-blue hover:text-bright-blue cursor-pointer">
          {children}
        </a>
      );
  }
}
