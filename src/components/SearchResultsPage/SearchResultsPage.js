import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useSelector } from "react-redux";

import Loader from "react-loader-spinner";
import FilterGroup from "./FilterGroup/FilterGroup";
import ExpPreviewPanel from "./ExpPreviewPanel/ExpPreviewPanel";
import Pagination from "../Pagination/Pagination";
import Select from "react-select";

import SearchInput from "../common/inputs/SearchInput";
import Dropdown from "../common/inputs/Dropdown";
import PageWrapper from "../common/PageWrapper";

// import dummyJSON from '../../resources/dummy.json';

/* this helper method takes in the location object and returns the keyword 
    parameter */
const getKeywordParam = (location) => {
  const parsedQuery = queryString.parse(location.search);
  return parsedQuery.keyword;
};

/* this helper method will update the current search parameter with a new value
    and return its string representation */
export const getUpdatedSearchQuery = (location, paramObj, isChecked) => {
  const queryObj = queryString.parse(location.search);

  for (let paramNm in paramObj) {
    // if it's the page parameter, we just update it to 1
    if (paramNm === "p") {
      queryObj[paramNm] = paramObj[paramNm];
      continue;
    }
    if (paramNm === "sort") {
      queryObj[paramNm] = paramObj[paramNm];
      continue;
    }
    // if checkbox is checked then we're adding a value to a parameter
    if (isChecked) {
      // if param already has a value
      if (queryObj[paramNm]) {
        // if the value is an array we add to the array otherwise we
        // create a new array and add the new value
        if (Array.isArray(queryObj[paramNm])) {
          queryObj[paramNm].push(paramObj[paramNm]);
        } else {
          let valArr = [queryObj[paramNm]];
          valArr.push(paramObj[paramNm]);
          queryObj[paramNm] = valArr;
        }
      } else {
        queryObj[paramNm] = paramObj[paramNm];
      }
      // if checkbox is unchecked then we're removing a value
    } else {
      // if param already has a value
      if (queryObj[paramNm]) {
        // if the value is an array
        if (Array.isArray(queryObj[paramNm])) {
          var filteredArr = queryObj[paramNm].filter(
            (e) => e !== paramObj[paramNm]
          );
          queryObj[paramNm] = filteredArr;
        } else {
          queryObj[paramNm] = null;
        }
      }
    }
  }

  return queryObj;
};

/* this helper method takes in a query object and returns its query string 
    representation */
export const getSearchString = (queryObj) => {
  let result = "";

  for (let param in queryObj) {
    if (queryObj[param] !== null) {
      // if the parameter has an array of values we need to iterate
      // through them
      if (Array.isArray(queryObj[param])) {
        for (let val of queryObj[param]) {
          // check if we need to add '&' in the beginning
          if (result === "") {
            result += param + "=" + val;
          } else {
            result += "&" + param + "=" + val;
          }
        }
      } else {
        if (result === "") {
          result += param + "=" + queryObj[param];
        } else {
          result += "&" + param + "=" + queryObj[param];
        }
      }
    }
  }

  return result;
};

const getPage = (location) => {
  const page = queryString.parse(location.search);
  return page.p;
};

/* This component represents the search result page shown whenever a user 
    submits a search */
const SearchResultPage = (props) => {
  // Initial state for tracking found courses
  const [coursesState, setCoursesState] = useState({
    coursesObj: null,
    isLoading: false,
    page: 1,
    error: null,
  });

  const [filterDropdown, setFilterDropdown] = useState({
    label: "Most Relevant",
    value: "MostRelevant",
  });

  // initial state to track input on the search bar
  const [searchInputState, setSearchInputState] = useState({
    input: "",
  });
  let location = useLocation();
  let history = useHistory();
  // TODO: get this url from configuration
  const api_url = process.env.REACT_APP_ES_API;
  const keyword = getKeywordParam(location);
  const pageNum = getPage(location);
  const placeholderText = "Search for anything";
  const backendHost = process.env.REACT_APP_BACKEND_HOST;

  // TODO: remove placeholder images when data comes in with images

  let expPanelContent = null;
  let numResultsContent = (
    <div className="row">
      <h2>{0 + ' results for "' + keyword + '"'}</h2>
    </div>
  );
  let aggregations = [];
  // Getting the global configuration object from the redux store
  const { configuration } = useSelector((state) => state.configuration);
  const { status } = useSelector((state) => state.configuration);

  /* This function handles when a filter checkbox is clicked */
  function handleFilterSelect(e, fieldName) {
    let paramObj = {};
    paramObj[fieldName] = e.target.value;
    paramObj["p"] = 1;

    const updatedParamObj = getUpdatedSearchQuery(
      location,
      paramObj,
      e.target.checked
    );
    const searchString = getSearchString(updatedParamObj);
    history.push({
      pathname: "/search/",
      search: searchString,
    });
  }

  // Once the courses are loaded, we set up the aggregation object
  if (coursesState.coursesObj) {
    let aggObj = coursesState.coursesObj.aggregations;

    for (const groupNm in aggObj) {
      let groupObj = {
        title: groupNm,
        values: aggObj[groupNm].buckets,
        fieldName: aggObj[groupNm].field_name,
      };

      if (groupObj.values.length > 0) {
        aggregations.push(groupObj);
      }
    }
  }

  /* Whenever the component first renders, we make an API call to find courses
        using the keyword in the url */
  useEffect(() => {
    let url = api_url + location.search;
    setCoursesState((previousState) => {
      const resultState = {
        coursesObj: null,
        isLoading: true,
        page: pageNum,
        error: null,
      };
      return resultState;
    });
    axios
      .get(url)
      .then((response) => {
        setCoursesState((previousState) => {
          return {
            coursesObj: response.data,
            isLoading: false,
            page: pageNum,
            error: null,
          };
        });
      })
      .catch((err) => {
        setCoursesState((previousState) => {
          return {
            coursesObj: null,
            isLoading: false,
            page: pageNum,
            error: err,
          };
        });
      });
  }, [location.search, pageNum, api_url]);

  /* Whenever the component renders, we copy the keyword from the URL to the 
        search bar */
  useEffect(() => {
    setSearchInputState((previousState) => {
      return { input: keyword };
    });
  }, [keyword]);

  // here we check that the configuration was loaded successfully from redux
  if (status === "succeeded") {
    // do something
  } else if (status === "failed") {
    // do something
  }

  // Once courses are returned from the API we display them in preview panels
  if (coursesState.coursesObj && !coursesState.isLoading) {
    if (coursesState.coursesObj.total < 1) {
      expPanelContent = (
        <h3 className="informational-text">
          Sorry, we couldn't find any results for "{keyword}"
        </h3>
      );
    } else {
      expPanelContent = coursesState.coursesObj.hits.map((exp, idx) => {
        if (exp.Technical_Information && exp.Technical_Information.Thumbnail) {
          return (
            <ExpPreviewPanel
              expObj={exp}
              key={idx}
              imgLink={exp.Technical_Information.Thumbnail}
            />
          );
        } else {
          if (configuration && configuration.course_img_fallback) {
            return (
              <ExpPreviewPanel
                expObj={exp}
                key={idx}
                imgLink={backendHost + configuration.course_img_fallback}
              />
            );
          } else {
            return <ExpPreviewPanel expObj={exp} key={idx} />;
          }
        }
      });
    }

    numResultsContent = (
      <div className="row">
        <h2>
          {coursesState.coursesObj.total + ' results for "' + keyword + '"'}
        </h2>
      </div>
    );
    // handles cases where the API call returns an error
  } else if (coursesState.error && !coursesState.isLoading) {
    expPanelContent = (
      <div className="informational-text">
        Error Loading experiences. Please contact an administrator.
      </div>
    );
    // loading spinner during API call
  } else {
    expPanelContent = (
      <div className="spinner-section">
        <Loader type="Rings" color="#c7c7c7" height={80} width={80} />
      </div>
    );
  }

  let pagination = null;
  if (
    coursesState.coursesObj &&
    !coursesState.isLoading &&
    coursesState.coursesObj.total >= 1
  ) {
    pagination = (
      <div className="my-2">
        <Pagination
          courseState={coursesState.coursesObj}
          page={coursesState.page}
          searchInputState={searchInputState.input}
        />
      </div>
    );
  }

  let options = [{ value: "MostRelevant", label: "Most Relevant" }];
  if (configuration != null) {
    for (let param in configuration.search_sort_options) {
      options.push({
        value: configuration.search_sort_options[param].field_name,
        label: configuration.search_sort_options[param].display_name,
      });
    }
  }

  const handleDataFilterSelect = (event) => {
    setFilterDropdown(event);
    let paramObj = {};
    //if sort is not in the url, then it is added
    if (paramObj["sort"] === null) {
      const updatedParamObj = getUpdatedSearchQuery(location, paramObj, true);
      const searchString = getSearchString(updatedParamObj);
      history.push({
        pathname: "/search/",
        search: searchString + "&sort=" + event.value,
      });
    }
    //if sort is already in the url, replace value
    else {
      if (event.value === "MostRelevant") {
        paramObj["sort"] = null;
      } else {
        paramObj["sort"] = event.value;
      }
      const updatedParamObj = getUpdatedSearchQuery(location, paramObj, true);
      const searchString = getSearchString(updatedParamObj);
      history.push({
        pathname: "/search/",
        search: searchString,
      });
    }
  };

  //sort functionality dropdown
  let filterDataDropdown = null;
  if (coursesState.coursesObj != null && coursesState.coursesObj.total > 0) {
    filterDataDropdown = (
      <Dropdown
        options={options}
        placeholder="Select an option"
        onChange={handleDataFilterSelect}
      />
    );
  }

  const handleEnterKey = (event) => {
    // Handles if the the user hits enter and there is data to be searched.
    if ((event.key === "Enter" || event.key === 13) && searchInputState.input) {
      props.history.push({
        pathname: "/search/",
        search: `?keyword=${searchInputState.input}&p=1`,
      });
    }
  };
  const handleSubmit = () => {
    history.push({
      pathname: "/search/",
      search: `?keyword=${searchInputState.input}&p=1`,
    });
  };

  let mainPageContent = (
    <>
      <div className="px-3">{numResultsContent}</div>
      <div className="grid grid-cols-5 space-x-2">
        <div className="col-span-1 bg-white rounded-md">
          {aggregations.map((group, idx) => {
            return (
              <FilterGroup
                groupObj={group}
                key={idx}
                onChange={(e) => handleFilterSelect(e, group.fieldName)}
                paramObj={queryString.parse(location.search)}
              />
            );
          })}
        </div>
        <div className="col-span-4 bg-white rounded-md px-1">
          <div className="w-80 mx-auto mt-2 space-y-2 mb-9">
            <SearchInput
              className="shadow-none"
              queryValue={searchInputState.input}
              handleEnter={handleEnterKey}
              handleSearch={handleSubmit}
              handleChange={(event) =>
                setSearchInputState({ input: event.target.value })
              }
              placeholder="Search for anything"
            />
            {filterDataDropdown}
          </div>
          <div className='divide-y'>{expPanelContent}</div>
          {pagination}
        </div>
      </div>
    </>
  );

  const overlay = (
    <>
      <div className="content-overlay"></div>
    </>
  );

  return (
    <PageWrapper className="bg-body-gray">
      <div className="my-10">
        {mainPageContent}
        {coursesState.isLoading === true ? overlay : ""}
      </div>
    </PageWrapper>
  );
};

export default SearchResultPage;
