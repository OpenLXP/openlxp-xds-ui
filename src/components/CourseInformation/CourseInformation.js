import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import CourseImage from "./CourseImage/CourseImage";
import CourseButton from "./CourseButton/CourseButton";
import CourseDetails from "./CourseDetails/CourseDetails";
import CourseDescription from "./CourseDescription/CourseDescription";
import RelatedCourses from "./RelatedCourses/RelatedCourses";
import CourseAddToListButton from "./CourseAddToListButton/CourseAddToListButton"
import InterestGroupPopup from "./InterestGroupPopup/InterestGroupPopup"

const CourseInformation = (props) => {
  // Getting the current location and the data
  const location = useLocation();
  const imgLink = location.state.imgLink;
  const courseData = location.state.expObj;

  // The base url for the back end
  const api_url = process.env.REACT_APP_ES_MLT_API;

  // Inits the related courses
  const [relatedCourses, setRelatedCourses] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  //  Fetch similar courses from the backend
  useEffect(() => {
    setRelatedCourses({ data: null, isLoading: true, error: null });

    // Making call to back end for related courses
    axios
      .get(api_url + courseData.meta.id)
      .then((resp) =>
        setRelatedCourses({
          data: resp.data,
          isLoading: false,
          error: null,
        })
      )
      .catch((err) => {
        setRelatedCourses({
          data: null,
          isLoading: false,
          error: err,
        });
      });
  }, [courseData.meta.id, api_url]);

  // Get the global config
  const { configuration } = useSelector((state) => state.configuration);

  // List of icons that come from the backend
  const icons = {
    user: "person-outline",
    clock: "time-outline",
    calendar: "calendar-outline",
    location: "location-outline",
    hourglass: "hourglass-outline",
    multi_users: "people-outline",
  };

  // Returns the icon name to use from backend config
  const getIconNameToUse = (name) =>
    icons[name] ? icons[name] : icons["calendar"];

  // Return the value of specific detail.

  const getCourseDataMapping = (strKey, data) => {
    // gets the keys for the data mapping
    const objKeys = strKey.split(".");

    // inits with all the data
    let valueToReturn = data;

    // Reduces it down to the specific value
    objKeys.forEach((key) => {
      if (valueToReturn) {
        valueToReturn = valueToReturn[key];
      }
    });
    // Returning the desired value.
    return valueToReturn;
  };

  // Get the global config
  // const { configuration } = useSelector((state) => state.configuration);

  let courseInfo = {};
  let courseDetails = undefined;

  // Wait for the configuration to be available.
  if (configuration) {
    // Get the icon to render
    courseDetails = configuration?.course_highlights.map((item, index) => {
      return {
        icon: getIconNameToUse(item.highlight_icon),
        name: item.display_name,
        value: getCourseDataMapping(item.field_name, courseData) || "",
      };
    });

    // gets the course information mappings
    const courseDataMappings = configuration.course_information;
    courseInfo = {
      title: getCourseDataMapping(courseDataMappings.course_title, courseData),
      url: getCourseDataMapping(courseDataMappings.course_url, courseData),
      desc: getCourseDataMapping(
        courseDataMappings.course_description,
        courseData
      ),
    };
  }

  //handles click of "Add to List" button
  // const handleAddToList = () => {

  // }

  return (
    <div className="content-section">
      <div className="row content-panel course-detail">
        <div className="inner-content">
          <h2 className="font-bold">{courseInfo.title}</h2>
          <div className="row mx-auto">
            <div className="col span-2-of-5 my-auto justify-center">
              <CourseImage img={imgLink} />
              <CourseButton url={courseInfo.url} />
              {/* <CourseAddToListButton handleAddToList={handleAddToList}/> */}
              <InterestGroupPopup></InterestGroupPopup>
            </div>
            <div className="col span-3-of-5">
              <CourseDetails details={courseDetails} />
            </div>
          </div>
          <CourseDescription desc={courseInfo.desc} />
        </div>
        {relatedCourses.data ? (
          <RelatedCourses data={relatedCourses.data} /> // If the data is not there
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CourseInformation;
