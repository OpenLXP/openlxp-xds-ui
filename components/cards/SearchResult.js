export default function SearchResult({ result }) {
  const {
    CourseTitle,
    CourseShortDescription,
    CourseProviderName
  } = result.Course;

  return (
    <div>
      <h1 className={'text-xl font-semibold'}>{CourseTitle}</h1>
      <h2 className={'font-normal font-sans'}><span
        className={'font-semibold'}>Provider:&nbsp;</span>{CourseProviderName}
      </h2>
      <p className={'line-clamp-3'}>{CourseShortDescription}</p>
    </div>
  );
}
