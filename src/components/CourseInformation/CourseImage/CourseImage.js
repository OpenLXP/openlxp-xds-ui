import classes from "../CourseInformation.module.css";

const CourseImage = (props) => {
  const img = props.img;

  if (!img) {
    return (
      <div
        data-testid="image"
        className={
          "w-64 h-32 bg-gradient-to-br from-base-blue to-dark-blue rounded-md"
        }
      />
    );
  }

  return <img className="rounded-sm" src={img} alt={"Course"} />;
};

export default CourseImage;
