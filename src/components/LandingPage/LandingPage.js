import React, { useState, useEffect } from "react";
import axios from "axios";

import PageWrapper from "../common/PageWrapper";
import SearchInput from "../common/inputs/SearchInput";
import Button from "../common/inputs/Button";
import ExperienceCard from "../ExperienceCard/ExperienceCard";

const LandingPage = ({ history }) => {
  // state to keep track of typed input in search bar

  const landingHeader = "Enterprise Course Catalog*";
  const landingSubHeader =
    "This catalog lets you search for all DoD " +
    "unclassified training and education courses, seminars, instructional" +
    " resources and more.";
  const placeholderText = "";

  const [query, setQuery] = useState("");

  const handleEnterKey = (event) => {
    // Checking the event for the enter key.
    if (event.key === "Enter" || event.key === 13) {
      // Handling the submit as if it was a button press
      handleSubmit();
    }
  };

  const handleSubmit = (event) => {
    // Using the passed history object to move pages
    history.push({
      pathname: "/search/",
      search: `?keyword=${query}&p=1`,
    });
  };

  const handleChange = (event) => {
    // get the current value in the input
    const value = event.target.value;
    setQuery(value);
  };

  const api_url = process.env.REACT_APP_SPOTLIGHT_COURSES;

  // state to keep track of all the related course found
  const [spotlightCoursesState, setSpotlightCoursesState] = useState({
    coursesObj: null,
    isLoading: false,
    error: null,
  });

  // Fetch spotlight courses from elastic search
  useEffect(() => {
    let url = api_url;
    // set the loading state
    setSpotlightCoursesState((previousState) => {
      const resultState = {
        coursesObj: null,
        isLoading: true,
        error: null,
      };
      return resultState;
    });
    axios
      .get(url)
      .then((response) => {
        setSpotlightCoursesState((previousState) => {
          return {
            coursesObj: response.data,
            isLoading: false,
            error: null,
          };
        });
      })
      .catch((err) => {
        setSpotlightCoursesState((previousState) => {
          return {
            coursesObj: null,
            isLoading: false,
            error: err,
          };
        });
      });
  }, [api_url]);

  // showing loading text when the api call is in progress
  let cardSection = <div>Error Loading Spotlight Courses.</div>;
  if (spotlightCoursesState.isLoading === true) {
    cardSection = <div className="center-text">Loading...</div>;
    // once the api call is done and it's not an error we load the previews
  } else if (
    spotlightCoursesState.coursesObj &&
    spotlightCoursesState.isLoading === false
  ) {
    console.log(spotlightCoursesState.coursesObj);
    cardSection = spotlightCoursesState.coursesObj.map((course, idx) => {
      return <ExperienceCard courseObj={course} key={idx} />;
    });
  }

  return (
    <PageWrapper>
      <div className="text-center pt-10">
        <h2 className="font-semibold text-2xl">{landingHeader}</h2>
        <h5 className='px-36 mt-4 font-semibold'>{landingSubHeader}</h5>
      </div>
      <div className="flex flex-col my-12 items-center w-96 mx-auto space-y-8">
        <SearchInput
          placeholder="Search for anything"
          handleEnter={handleEnterKey}
          handleSearch={handleSubmit}
          handleChange={handleChange}
        />
        <Button onClick={handleSubmit} title="Search" className="w-32" />
      </div>

      <div className="border-t-2 pt-10 pb-2">
        <h2 className="font-semibold text-center">Spotlight</h2>
        <div className="row card-section">{cardSection}</div>
      </div>
    </PageWrapper>
  );
};

export default LandingPage;
