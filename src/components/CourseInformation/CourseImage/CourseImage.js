import classes from "../CourseInformation.module.css";

const CourseImage = (props) => {
	const img = props.img;

	if (!img) {
		return <div data-testid="image" className={classes.courseImage}></div>;
	}

	return <img className="rounded-sm" src={img} alt={"Course"} />;

};

export default CourseImage;
