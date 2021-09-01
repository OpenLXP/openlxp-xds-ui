import { Title } from "../common/text/text";

export default function SearchForm({ params, handleChange, handleSubmit }) {
  return (
    <form className="">
      <div className="bg-white rounded-md p-2">
        <div className=" flex justify-center gap-2 my-2 items-center">
          <div className="flex flex-col">
            <label htmlFor="Course.CourseTitle">Course Title</label>
            <input
              className="border shadow rounded pl-1"
              type="text"
              name="Course.CourseTitle"
              id="Course.CourseTitle"
              value={params["Course.CourseTitle"]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Course.CourseProviderName">Course Provider</label>
            <input
              className="border shadow rounded pl-1"
              type="text"
              name="Course.CourseProviderName"
              id="Course.CourseProviderName"
              value={params["Course.CourseProviderName"]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="CourseInstance.CourseLevel">Course Level</label>
            <input
              className="border shadow rounded pl-1"
              type="text"
              name="CourseInstance.CourseLevel"
              id="CourseInstance.CourseLevel"
              value={params["CourseInstance.CourseLevel"]}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-center items-center cursor-pointer self-end bg-base-blue px-2 rounded-md text-white gap-1"
            onClick={handleSubmit}>
            <ion-icon name="search-outline" />
            Search
          </div>
          <input type="hidden" name="p" value={1} />
        </div>
      </div>
    </form>
  );
}
