import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import CourseImage from "./CourseImage/CourseImage";
import CourseButton from "./CourseButton/CourseButton";
import CourseDetails from "./CourseDetails/CourseDetails";
import RelatedCourses from "./RelatedCourses/RelatedCourses";
import InterestGroupPopup from "./InterestGroupPopup/InterestGroupPopup";
import PageWrapper from "../common/PageWrapper";
import ErrorPage from "../common/ErrorPage";

const CourseInformation = () => {

  // Get the global config
  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const location = useLocation();
  // const courseData = location.state.expObj;
  // const imgLink = location.state.imgLink;
  // const api_url = process.env.REACT_APP_ES_MLT_API;

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

  const [courseInfo, setCourseInfo] = useState({
    data: null,
    isLoading: false,
    error: null,
  });
  const [relatedCourses, setRelatedCourses] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ADD_COURSE_TO_LISTS + id)
      .then((resp) => {
        setCourseInfo({
          data: resp.data,
          isLoading: false,
          error: null,
        })
      })
      .catch((err) => {
        setCourseInfo({
          data: null,
          isLoading: false,
          error: err,
        });
      });

    if (!courseInfo.error) {

      // Making call to back end for related courses
      axios
        .get(process.env.REACT_APP_ES_MLT_API + id)
        .then((resp) => {
          setRelatedCourses({
            data: resp.data,
            isLoading: false,
            error: null,
          })
        })
        .catch((err) => {
          setRelatedCourses({
            data: null,
            isLoading: false,
            error: err,
          });
        });
    }
  }, [id, courseInfo.error]);

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

  let courseDetails = {};

  // Wait for the configuration to be available.
  if (configuration) {
    const courseDataMappings = configuration.course_information;
    courseDetails = {
      title: getCourseDataMapping(courseDataMappings?.course_title, courseInfo.data),
      url: getCourseDataMapping(courseDataMappings?.course_url, courseInfo.data),
      desc: getCourseDataMapping(
        courseDataMappings.course_description,
        courseInfo.data
      ),
    };
    courseDetails.supplmentary = configuration?.course_highlights.map((item) => {
      return {
        icon: getIconNameToUse(item.highlight_icon),
        name: item.display_name,
        value: getCourseDataMapping(item.field_name, courseInfo.data) || "",
      };
    });
  }

  // return an error if the courseInfo has an error
  if (courseInfo.error) {
    return (
      <ErrorPage>
        Error loading course data. Please contact an administrator.
      </ErrorPage>
    )
  }

  // render if everything is 'ok'
  return (
    <PageWrapper>
      <div className="px-2 py-5">
        <h2 className="font-semibold text-2xl my-2">
          {courseDetails.title}
        </h2>
        <div className="">
          <div className="float-left space-y-2 pr-5 pb-1">
            <CourseImage
              image={courseInfo.data?.Technical_Information?.Thumbnail}/>
            <CourseButton url={courseDetails.url}/>
            {user && <InterestGroupPopup/>}
          </div>
          <h3 className="text-left text-lg font-semibold mb-1">
            Course Description
          </h3>
          <p className="text-xs">
            {courseDetails.desc}
          </p>
        </div>
      </div>
      <div className="border-b py-2 clear-both my-2"/>
      <div className="px-2 clear-both">
        <div
          className="flex flex-row flex-wrap justify-start items-baseline gap-2">
          {courseDetails.supplmentary?.map((detail, index) => (
            <CourseDetails detail={detail} key={index}/>
          ))}
        </div>
      </div>
      {relatedCourses.data && <RelatedCourses data={relatedCourses.data}/>}
      {!relatedCourses?.data && <div>Loading...</div>}
    </PageWrapper>
  );
};

export default CourseInformation;
