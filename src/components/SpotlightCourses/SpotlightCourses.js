import React, { useState, useEffect } from "react";
import axios from "axios";

import ExperienceCard from "../ExperienceCard/ExperienceCard";

const SpotlightCourses = () => {
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
    cardSection = spotlightCoursesState.coursesObj.map((course, idx) => {
      return <ExperienceCard courseObj={course} key={idx} />;
    });
  }

  return (
    <div className="pt-10 pb-2">
      <h2 className="font-semibold text-center">Spotlight</h2>
      <div className="row card-section">{cardSection}</div>
    </div>
  );
};

export default SpotlightCourses;
