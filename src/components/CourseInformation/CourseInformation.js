import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import CourseImage from "./CourseImage/CourseImage";
import CourseButton from "./CourseButton/CourseButton";
import CourseDetails from "./CourseDetails/CourseDetails";
import CourseDescription from "./CourseDescription/CourseDescription";
import RelatedCourses from "./RelatedCourses/RelatedCourses";

const CourseInformation = (props) => {
  // Getting the current location and the data
  const location = useLocation();
  const courseData = location.state.expObj;
  const imgLink = location.state.imgLink;

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

  console.log(configuration);
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
    let valueToReturn = data;
    const objKeys = strKey.split(".");

    // Reduces it down to the specific value
    objKeys.forEach((key) => {
      if (valueToReturn) {
        valueToReturn = valueToReturn[key];
      }
    });

    // Returning the desired value.
    return valueToReturn;
  };

  let courseDetails = undefined;
  let courseInformation = {};

  // Wait for the configuration to be available.
  if (configuration) {
    // Get the icon to render
    courseDetails = configuration.course_highlights.map((item, index) => {
      return {
        icon: getIconNameToUse(item.highlight_icon),
        name: item.display_name,
        value: getCourseDataMapping(item.field_name, courseData) || "",
      };
    });

    // gets the course information mappings
    const courseInfoMappings = configuration.course_information;
    courseInformation = {
      title: getCourseDataMapping(courseInfoMappings.course_title, courseData),
      url: getCourseDataMapping(courseInfoMappings.course_url, courseData),
      desc: getCourseDataMapping(
        courseInfoMappings.course_description,
        courseData
      ),
    };
  }

  return (
    <div className="content-section">
      <div className="row content-panel course-detail">
        <div className="inner-content">
          <h4>{courseInformation.title}</h4>

          <div className="row">
            <div className="col span-2-of-5">
              <CourseImage img={imgLink} />
              <CourseButton url={courseInformation.url || "/"} />
            </div>
            <div className="col span-3-of-5">
              <CourseDetails details={courseDetails} />
            </div>
          </div>

          <CourseDescription desc={courseInformation.desc} />
        </div>
      </div>
      <RelatedCourses data={relatedCourses.data} />
    </div>
  );
};

export default CourseInformation;