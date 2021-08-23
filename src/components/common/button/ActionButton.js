export default function ActionButton({ href, title }) {
  return <a href={href}>
    <div
      className="py-2 px-3 text-center shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out font-semibold"
    >
      {title}
    </div>
  </a>
}