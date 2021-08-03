const CourseAddToListButton = (props) => {

	return (
		<button target="blank_" rel="noreferrer" 
        className="ml- bg-white text-base-blue font-bold underline py-2 px-4 rounded hover:bg-blue-300 hover:bg-opacity-50 transition-colors duration-300 ease-in-out" 
        onClick={props.handleAddToList}>
			Add to list
		</button>
	);
};
export default CourseAddToListButton;
