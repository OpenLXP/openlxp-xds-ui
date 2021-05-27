import classes from "../CourseInformation.module.css";

const CourseImage = (props) => {
	const img = props.img;

	if (!img) {
		return <div className={classes.courseImage}></div>;
	}

	return <img src={img} alt={"Course Image"} />;
};

export default CourseImage;
