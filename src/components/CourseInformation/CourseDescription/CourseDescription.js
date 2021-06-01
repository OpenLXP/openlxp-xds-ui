import classes from "../CourseInformation.module.css";

const CourseDescription = (props) => {
  // Expects a course desc to be passed in
  const desc = props.desc;

  if (!desc) {
    return null;
  }

  return (
    <div className={classes.desc}>
      <h4>Course Description</h4>
      <p>{desc}</p>
    </div>
  );
};

export default CourseDescription;
