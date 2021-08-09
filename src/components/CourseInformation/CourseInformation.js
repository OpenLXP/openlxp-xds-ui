import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CourseImage from "./CourseImage/CourseImage";
import CourseButton from "./CourseButton/CourseButton";
import CourseDetails from "./CourseDetails/CourseDetails";
import RelatedCourses from "./RelatedCourses/RelatedCourses";
import InterestGroupPopup from "./InterestGroupPopup/InterestGroupPopup";
import PageWrapper from "../common/PageWrapper";

const CourseInformation = (props) => {
  // Getting the current location and the data
  const location = useLocation();
  const imgLink = location.state.imgLink;
  const courseData = location.state.expObj;
  const {id} = useParams();
  console.log(id);

  const { user } = useSelector((state) => state.user);

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

  // Inits course information
  const [coursesInfo, setCoursesInfo] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  //  Fetch course information from the backend
  useEffect(() => {
    setCoursesInfo({ data: null, isLoading: true, error: null });

    // Making call to back end for course data
    axios
      .get(process.env.REACT_APP_ADD_COURSE_TO_LISTS + id)
      .then((resp) =>
        setCoursesInfo({
          data: resp.data,
          isLoading: false,
          error: null,
        })
      )
      .catch((err) => {
        setCoursesInfo({
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
      title: getCourseDataMapping(courseDataMappings?.course_title, courseData),
      url: getCourseDataMapping(courseDataMappings?.course_url, courseData),
      desc: getCourseDataMapping(
        courseDataMappings.course_description,
        courseData
      ),
    };
  }
  return (
    <PageWrapper>
      <div className="px-2 py-5">
        <h2 className="font-semibold text-2xl my-2">{coursesInfo.data?.Course.CourseTitle}</h2>
        <div className="">
          <div className="float-left space-y-2 pr-5 pb-1">
            <CourseImage img={imgLink} />
            <CourseButton url={coursesInfo.data?.Course.CourseURL} />
            {user && <InterestGroupPopup />}
          </div>
          <h3 className="text-left text-lg font-semibold mb-1">Course Description</h3>
          <p className="text-xs">{coursesInfo.data?.Course.CourseShortDescription}</p>
        </div>
      </div>
      <div className="border-b py-2 clear-both my-2"></div>
      <div className="px-2 clear-both">
        <div className="flex flex-row flex-wrap justify-start items-baseline gap-2">
          {courseDetails?.map((detail, index) => (
            <CourseDetails detail={detail} key={index} />
          ))}
        </div>
      </div>

      {relatedCourses.data && <RelatedCourses data={relatedCourses.data} />}
      {!relatedCourses?.data && <div>Loading...</div>}
    </PageWrapper>
  );
};

export default CourseInformation;
