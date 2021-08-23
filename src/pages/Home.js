import React, { useState } from "react";
import PageWrapper from "../common/PageWrapper";
import SearchInput from "../common/inputs/SearchInput";
import Button from "../common/inputs/Button";
import SpotlightCourses from "../SpotlightCourses/SpotlightCourses";

export default function Home() {
  // state to keep track of typed input in search bar
  const landingHeader = "Enterprise Course Catalog*";
  const landingSubHeader =
    "This catalog lets you search for all DoD " +
    "unclassified training and education courses, seminars, instructional" +
    " resources and more.";
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
    <PageWrapper>
      <div className="text-center pt-10">
        <h2 className="font-semibold text-2xl">{landingHeader}</h2>
        <h5 className="px-36 mt-4 font-semibold">{landingSubHeader}</h5>
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
      <SpotlightCourses />
    </PageWrapper>
  );
}
