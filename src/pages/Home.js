import React, {useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import SearchInput from "../components/common/inputs/SearchInput";
import Button from "../components/common/inputs/Button";
import SpotlightCourses from "../components/SpotlightCourses/SpotlightCourses";
import {useHistory} from "react-router-dom";
import { Title, Section, Link, ErrorText } from "../components/common/text/text";

export default function Home() {
  // state to keep track of typed input in search bar

  const history = useHistory()
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
      <div className="bg-white rounded-md py-8">
        <div className="text-center pt-10">
          <Title title={landingHeader} />
          <h5 className="px-36 mt-4 font-semibold">{landingSubHeader}</h5>
        </div>
        <div
          className="flex flex-col my-12 items-center w-96 mx-auto space-y-8">
          <SearchInput
            placeholder="Search for anything"
            handleEnter={handleEnterKey}
            handleSearch={handleSubmit}
            handleChange={handleChange}
          />
          <Button onClick={handleSubmit} title="Search" className="w-32"/>
        </div>
      </div>
      <SpotlightCourses/>
    </PageWrapper>
  );
}
