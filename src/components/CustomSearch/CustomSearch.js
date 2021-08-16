import PageWrapper from "../common/PageWrapper";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import queryString from "query-string";
import axios from "axios";
export default function CustomSearch() {
  const location = useLocation();
  const history = useHistory();

  const [courses, setCourses] = useState({
    isLoading: true,
    error: null,
    data: null,
  });

  const [searchInfo, setSearchInfo] = useState({
    "CourseInstance.CourseLevel": "",
    "Course.CourseProviderName": "",
    "Course.CourseTitle": "",
    "p": 1,
  });

  // on load....
  useEffect(() => {
    // grab data from url
    setSearchInfo(queryString.parse(location.search));

    // make call to api
    let url = `${process.env.REACT_APP_ES_API}filter-search${location.search}`;
    axios
      .get(url)
      .then((res) => {
        setCourses({ isLoading: false, error: null, data: res.data });
        console.log(courses);
      })
      .catch((err) => {
        setCourses({ isLoading: false, error: err, data: null });
      });
  }, [courses.isLoading, location.search]);

  const handleChange = (e) => {
    setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(location.search);
    history.push({
      path: "filter-search",
      search: `?Course.CourseTitle=${
        searchInfo["Course.CourseTitle"]
      }&Course.CourseProviderName=${
        searchInfo["Course.CourseProviderName"]
      }&CourseInstance.CourseLevel=${
        searchInfo["CourseInstance.CourseLevel"]
      }&p=${1}`,
    });
  };

  const handlePageChange = () => {
    console.log(searchInfo);
    history.push({
      path: "filter-search",
      search: `?Course.CourseTitle=${searchInfo["Course.CourseTitle"]}&Course.CourseProviderName=${searchInfo["Course.CourseProviderName"]}&CourseInstance.CourseLevel=${searchInfo["CourseInstance.CourseLevel"]}&p=${searchInfo.p}`,
    });
  };

  return (
    <PageWrapper>
      <form>
        <div className="flex flex-row bg-white rounded-md p-4 justify-around">
          <div className="flex flex-col">
            <label htmlFor="CourseTitle" className="text-md tracking-wider">
              Title
            </label>
            <input
              value={searchInfo["Course.CourseTitle"]}
              type="text"
              name="Course.CourseTitle"
              id="CourseTitle"
              className="border shadow rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="CourseProviderName"
              className="text-md tracking-wider">
              Provider
            </label>
            <input
              value={searchInfo["Course.CourseProviderName"]}
              type="text"
              name="Course.CourseProviderName"
              id="CourseProviderName"
              className="border shadow rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="CourseLevel" className="text-md tracking-wider">
              Level
            </label>
            <input
              value={searchInfo["CourseInstance.CourseLevel"]}
              type="text"
              name="CourseInstance.CourseLevel"
              id="CourseLevel"
              className="border shadow rounded-md"
              onChange={handleChange}
            />
          </div>
          <input type="hidden" name="p" value={searchInfo.p} />
          <input
            className="rounded-md bg-base-blue text-white px-2"
            type="submit"
            value="search"
            onClick={handleSubmit}
          />
        </div>
      </form>
      <div className="flex flex-row justify-end gap-5 my-2 pb-2">
        <div
          className={`${
            searchInfo.p < 1 && "invisible"
          } bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setSearchInfo({ ...searchInfo, p: parseInt(searchInfo.p) - 1 });
          }}>
          prev
        </div>
        <div className="select-none">{parseInt(searchInfo.p)}</div>
        <div
          className={`${"block"} bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setSearchInfo({ ...searchInfo, p: parseInt(searchInfo.p) + 1 });
            handlePageChange();
          }}>
          next
        </div>
      </div>
      {courses.isLoading && "Loading..."}
      {!courses.isLoading && (
        <div>
          {courses.data.hits.map((hit) => {
            return JSON.stringify(hit);
          })}
        </div>
      )}
    </PageWrapper>
  );
}
