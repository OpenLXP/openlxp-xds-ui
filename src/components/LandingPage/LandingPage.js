import React, { useState } from "react";
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
          {dummy_json.map((course, idx) => {
            // for each course in the dummy json, render a card
            return <ExperienceCard courseObj={course} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
