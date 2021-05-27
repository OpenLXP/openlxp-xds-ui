const CourseButton = (props) => {
	const url = props.url;

	return (
		<a href={url} target="blank_" rel="noreferrer" className="btn">
			View Course
		</a>
	);
};
export default CourseButton;