import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExperienceCard from "../ExperienceCard/ExperienceCard";
import dummyJSON from "../../resources/dummy.json";

const LandingPage = ({ history }) => {
  // state to keep track of typed input in search bar

  const landingHeader = "Enterprise Course Catalog*";
  const landingSubHeader =
    "This catalog lets you search for all DoD " +
    "unclassified training and education courses, seminars, instructional" +
    " resources and more.";
  const placeholderText = "";
  // TODO: replace this json obj with a real call to elasticsearch
  const dummy_json = dummyJSON;

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

  // state to keep track of typed input in search bar
  const [ state, setState] = useState({
    keyword: ''
  });

  // const api_url = process.env.REACT_APP_ES_MLT_API;
  const api_url = "http://localhost:8080/es-api/spotlight-courses";
  console.log(api_url);

  // state to keep track of all the related course found
  const [coursesState, setCoursesState] = useState({
      coursesObj: null,
      isLoading: false,
      error: null
  });

  // Fetch similar courses from elastic search
  useEffect(() => {
      let url = api_url;
      // set the loading state
      setCoursesState(previousState => {
          const resultState = {
              coursesObj: null,
              isLoading: true,
              error: null
          }
          return resultState
      });
      axios.get(url)
          .then(response => {
              setCoursesState(previousState => {
                  return {
                      coursesObj: response.data,
                      isLoading: false,
                      error: null
                  }
              });
          })
          .catch(err => {
              setCoursesState(previousState => {
                  return {
                      coursesObj: null,
                      isLoading: false,
                      error: err
                  }
              })
          });
  }, [])

  // showing loading text when the api call is in progress
  let cardSection = (
    <div>
        Error Loading Popular cards.
    </div>
    )
    if (coursesState.isLoading === true) {
        cardSection = (
            <div className="center-text">Loading...</div>
        )
    // once the api call is done and it's not an error we load the previews
    } else if (coursesState.coursesObj && coursesState.isLoading === false) {
        console.log(coursesState.coursesObj);
        cardSection = (
            coursesState.coursesObj.map((course, idx) => {
                return <ExperienceCard courseObj={course} key={idx} />
            })
        );
    }

  return (
    <div className="row landing-section">
      <h2>{landingHeader}</h2>
      <h5>{landingSubHeader}</h5>
      <div className="row">
        <input
          className="search"
          type="text"
          placeholder={placeholderText}
          onKeyPress={handleEnterKey}
          value={query}
          data-testid="landing-search"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className="btn">
          Search
        </button>
      </div>
      <div className="row page-break"></div>
      <div className="row">
        <h4>Popular</h4>
        <div className="row card-section">
            {cardSection}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
