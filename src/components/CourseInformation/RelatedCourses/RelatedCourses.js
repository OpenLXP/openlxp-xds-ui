import ExperienceCard from "../../ExperienceCard/ExperienceCard";

const RelatedCourses = (props) => {
  // Expects an array of courses
  const courses = props.data;

  // Returns the list of related courses
  return (
    <div className="row content-panel course-related">
      <h4 className="font-bold">Related</h4>
      <div className="row card-section">
        {courses.hits.map((course, index) => {
          return <ExperienceCard courseObj={course} key={index} />;
        })}
      </div>
    </div>
  );
};

export default RelatedCourses;
