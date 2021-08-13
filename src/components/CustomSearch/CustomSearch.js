import PageWrapper from "../common/PageWrapper";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import queryString from "query-string";
export default function CustomSearch() {
  const location = useLocation();
  const history = useHistory();

  const [searchInfo, setSearchInfo] = useState({
    CourseLevel: "",
    CourseProviderName: "",
    CourseTitle: "",
    p: 1,
  });

  // on load, grab the data from the url
  useEffect(() => {
    console.log(queryString.parse(location.search.replace(/Course[.]/g, "")));

    // sets the current values to be shown in the search boxes
    setSearchInfo(queryString.parse(location.search.replace(/Course[.]/g, "")));
    
    // make api to ES
    
  }, []);

  const handleChange = (e) => {
    setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
  };

  return (
    <PageWrapper className="bg-body-gray">
      <form>
        <div className="flex flex-row bg-white rounded-md p-4 justify-around">
          <div className="flex flex-col">
            <label htmlFor="CourseTitle" className="text-md tracking-wider">
              Title
            </label>
            <input
              value={searchInfo.CourseTitle}
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
              value={searchInfo.CourseProviderName}
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
              value={searchInfo.CourseLevel}
              type="text"
              name="Course.CourseLevel"
              id="CourseLevel"
              className="border shadow rounded-md"
              onChange={handleChange}
            />
          </div>
          <input
            className="rounded-md bg-base-blue text-white px-2"
            type="submit"
            value="search"
            onClick
          />
          <input type="hidden" name="p" value={searchInfo.p} />
        </div>
      </form>
      test
    </PageWrapper>
  );
}
