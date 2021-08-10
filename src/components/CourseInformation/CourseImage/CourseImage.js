const CourseImage = ({ image }) => {
  if (!image) {
    return (
      <div
        data-testid="image"
        className="w-64 h-32 mt-1.5 bg-gradient-to-br from-base-blue to-dark-blue rounded-md"
      />
    );
  }
  return <img className="rounded-sm w-64 h-32 mt-1.5" src={image}
              alt={"Course"}/>;
};

export default CourseImage;
