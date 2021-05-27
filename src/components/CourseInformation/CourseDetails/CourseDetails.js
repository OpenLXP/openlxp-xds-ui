const CourseDetails = (props) => {
	const details = props.details
	let col1 = [];
	let col2 = [];

	// Splits the items up into each column
	details.forEach((item, index) => {
		index % 2 === 0 ? col1.push(item) : col2.push(item);
	});


	// Individual cols for icons, name, and value
	const detail = (icon, name, value) => {
		return (
			<div>
				<ion-icon name={icon} />
				{name}:&nbsp;{value}
			</div>
		);
	};

	return (
		<div className="row">
			<div className="col span-1-of-2">
				{col1.map((item) => {
					return detail(item.icon, item.name, item.value);
				})}
			</div>
			<div className="col span-1-of-2">
				{col2.map((item) => {
					return detail(item.icon, item.name, item.value);
				})}
			</div>
		</div>
	);
};

export default CourseDetails;
