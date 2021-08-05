const CourseButton = (props) => {
  const url = props.url;
  console.log(url);
  return (
    <a
      href={url}
      target="blank_"
      rel="noreferrer"
      className="w-full block bg-base-blue text-center text-white py-2 rounded-md">
      View Course
    </a>
  );
};
export default CourseButton;
