import { useState } from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { useSelector } from "react-redux";

export default function FilterSearch() {
  const location = useLocation();
  const history = useHistory();

  const { configuration } = useSelector((state) => state.configuration);

  // search parameters from the url
  const [params, setParams] = useState(queryString.parse(location.search));
  const [courses, setCourses] = useState({
    isLoading: true,
    data: null,
    error: null,
  });

  const callBackend = () => {
    // state of the axios call
    setCourses({
      isLoading: true,
      data: null,
      error: null,
    });

    // hitting the backend with the location search params
    let url = `${process.env.REACT_APP_ES_API}filter-search${location.search}`;
    axios
      .get(url)
      .then((resp) => {
        setCourses({
          isLoading: false,
          data: resp.data,
          error: null,
        });
      })
      .catch((error) => {
        setCourses({
          isLoading: false,
          data: null,
          error: error,
        });
      });
  };

  const getNextPage = () => {
    let { search_results_per_page } = { ...configuration };

    params?.p <= courses?.data?.total / search_results_per_page &&
      setParams({ ...params, p: parseInt(params.p) + 1 });
  };

  const getPreviousPage = () => {
    params.p > 1 && setParams({ ...params, p: parseInt(params.p) - 1 });
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleViewCourse = (id) => {
    history.push(`/course/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // all new searches default to pg 1
    history.push({
      path: "filter-search2",
      search: `?Course.CourseTitle=${
        params["Course.CourseTitle"]
      }&Course.CourseProviderName=${
        params["Course.CourseProviderName"]
      }&CourseInstance.CourseLevel=${
        params["CourseInstance.CourseLevel"]
      }&p=${1}`,
    });
  };

  // on initial load of the page
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      callBackend();
    }

    return () => {
      isSubscribed = false;
    };
  }, [location.search]);

  useEffect(() => {
    // all new searches default to pg 1
    history.push({
      path: "filter-search2",
      search: `?Course.CourseTitle=${
        params["Course.CourseTitle"] || ""
      }&Course.CourseProviderName=${
        params["Course.CourseProviderName"] || ""
      }&CourseInstance.CourseLevel=${
        params["CourseInstance.CourseLevel"] || ""
      }&p=${params.p || 1}`,
    });
  }, [location.search, params.p]);

  return (
    <PageWrapper>
      <form className="px-2 flex justify-center">
        <div className="flex flex-row w-full flex-wrap gap-2 py-2 ">
          <div className="flex flex-col">
            <label htmlFor="CourseInstance.CourseLevel">Course Title</label>
            <input
              placeholder="Title"
              className="shadow rounded-md border px-2"
              type="text"
              name="Course.CourseTitle"
              id="Course.CourseTitle"
              value={params["Course.CourseTitle"]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="CourseInstance.CourseLevel">Course Provider</label>
            <input
              className="shadow rounded-md border px-2"
              placeholder="Provider Name"
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
              placeholder="Course Level"
              className="shadow rounded-md border px-2"
              type="text"
              name="CourseInstance.CourseLevel"
              id="CourseInstance.CourseLevel"
              value={params["CourseInstance.CourseLevel"]}
              onChange={handleChange}
            />
          </div>
          <input type="hidden" name="p" value={1} />
        </div>
      </form>
      <div className="px-2">
        <input
          type="submit"
          className="px-2 bg-base-blue text-white rounded-md cursor-pointer"
          name="Search"
          value="Search"
          onClick={handleSubmit}
        />
      </div>

      <div className="px-2 my-2 font-sans font-semibold text-lg">
        Total: {courses.data?.total}
      </div>
      <div className="flex flex-row justify-end gap-4 pb-8">
        <div
          className={`${
            params.p > 1
              ? "cursor-pointer block hover:bg-bright-blue"
              : "invisible"
          } bg-base-blue text-white px-1 rounded-md select-none`}
          onClick={getPreviousPage}>
          Back
        </div>
        <div className="select-none">{params.p}</div>
        <div
          className={`${
            params?.p <=
            courses?.data?.total / configuration?.search_results_per_page
              ? "cursor-pointer hover:bg-bright-blue block"
              : "invisible"
          } bg-base-blue text-white px-1 rounded-md select-none`}
          onClick={getNextPage}>
          Next
        </div>
      </div>
      {courses.isLoading && "Loading ..."}
      {!courses.isLoading &&
        courses?.data &&
        courses?.data.hits.map((course, index) => {
          return (
            <div
              className="px-4 py-2 flex flex-row justify-between gap-4"
              key={index}>
              <div className="flex flex-col">
                <div className="font-sans font-semibold line-clamp-1">
                  {course.Course.CourseTitle}
                </div>
                <div className="font-sans text-sm">
                  {course.Course.CourseProviderName}
                </div>
              </div>
              <div
                onClick={() => {
                  handleViewCourse(course?.meta?.id);
                }}
                className="cursor-pointer hover:text-bright-blue">
                View
              </div>
            </div>
          );
        })}
    </PageWrapper>
  );
}
