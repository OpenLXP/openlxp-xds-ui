import ExperienceCard from "../../ExperienceCard/ExperienceCard";

const RelatedCourses = ({ courses }) => {
  // Expects an array of courses

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
