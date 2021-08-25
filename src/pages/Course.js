import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActionButton } from "../components/common/button/buttons";
import { Error, Loading } from "../components/common/messages/messages";
import { Title, Section } from "../components/common/text/text";
import RelatedCourses from "../components/CoursePage/RelatedCourses";
import CourseDetail from "../components/CoursePage/CourseDetails";
import CourseImage from "../components/CoursePage/CourseImage";
import PlaceholderImage from "../components/CoursePage/PlaceholderImage";
import InterestGroupPopup from "../components/CoursePage/InterestGroupPopup";
import PageWrapper from "../components/common/PageWrapper";

export default function Course() {
  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const [course, setCourse] = useState({
    data: null,
    isLoading: false,
    error: null,
  });
  const [related, setRelated] = useState({
    isLoading: false,
    data: null,
    error: null,
  });
  const [configData, setConfigData] = useState({
    title: null,
    url: null,
    description: null,
    details: null,
  });

  // Functions to render data
  const getConfigurationDataFromMapping = (strKey, data) => {
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
  const getConfigurationMappings = () => {
    const courseInformation = configuration?.course_information;
    let { course_title, course_url, course_description } = courseInformation;

    const technicalInformation = course.data?.Technical_Information;
    const { Thumbnail } = { ...technicalInformation };

    // if there is a thumbnail from the data
    if (Thumbnail) {
      setConfigData({
        url: getConfigurationDataFromMapping(course_url, course.data),
        title: getConfigurationDataFromMapping(course_title, course.data),
        description: getConfigurationDataFromMapping(
          course_description,
          course.data
        ),
        details: configuration?.course_highlights,
        image: Thumbnail,
      });
    } else if (configuration?.course_img_fallback) {
      setConfigData({
        url: getConfigurationDataFromMapping(course_url, course.data),
        title: getConfigurationDataFromMapping(course_title, course.data),
        description: getConfigurationDataFromMapping(
          course_description,
          course.data
        ),
        details: configuration?.course_highlights,
        image:
          process.env.REACT_APP_BACKEND_HOST +
          configuration?.course_img_fallback,
      });
    } else {
      setConfigData({
        url: getConfigurationDataFromMapping(course_url, course.data),
        title: getConfigurationDataFromMapping(course_title, course.data),
        description: getConfigurationDataFromMapping(
          course_description,
          course.data
        ),
        details: configuration?.course_highlights,
      });
    }
  };
  const getCourseData = () => {
    setCourse({
      data: null,
      isLoading: true,
      error: null,
    });
    axios
      .get(process.env.REACT_APP_EXPERIENCES + id)
      .then((response) => {
        setCourse({
          data: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setCourse({
          data: null,
          isLoading: false,
          error: error,
        });
      });
  };
  const getRelatedCourses = () => {
    setRelated({
      isLoading: true,
      data: null,
      error: null,
    });
    axios
      .get(process.env.REACT_APP_ES_API + "more-like-this/" + id)
      .then((response) => {
        setRelated({
          isLoading: false,
          data: response.data,
          error: null,
        });
      })
      .catch((error) => {
        setRelated({
          isLoading: false,
          data: null,
          error: error,
        });
      });
  };

  // Get the data
  useEffect(() => {
    getCourseData();
  }, [id]);

  // Re-render the data on data update, or error
  useEffect(() => {
    // Gets the data mappings from the backend
    if (configuration) {
      getConfigurationMappings();
    }
    // if there is a course to find related for.
    if (!course.error) {
      getRelatedCourses();
    }
  }, [course.data, course.error]);

  console.log("data", course.data);
  return (
    <PageWrapper className="mb-8">
      <div className="bg-white rounded-md my-10 px-2 py-4">
        <div className="pb-5">
          <Title title={configData.title} />
        </div>
        <div className="float-left pr-5 pt-1.5">
          {!configData?.image && <PlaceholderImage />}
          {configData.image && <CourseImage image={configData.image} />}
          <div className="py-2 space-y-1">
            <ActionButton href={configData.url} title={"View Course"} />
            {user && <InterestGroupPopup courseId={course?.data?.meta.id} />}
          </div>
        </div>
        <Section title={"Course Description"} />
        <p className="text-sm">{configData.description}</p>
        <div className="border-b py-2 clear-both my-2" />
        <Section title={"Course Details"} />
        <div className="flex flex-row flex-wrap justify-start items-baseline gap-2 mt-2">
          {configData?.details?.map((detail) => {
            return (
              <CourseDetail
                value={getConfigurationDataFromMapping(
                  detail.field_name,
                  course.data
                )}
                icon={detail.highlight_icon}
                label={detail.display_name}
              />
            );
          })}
        </div>
      </div>
      {related?.data && !related?.error && (
        <RelatedCourses courses={related.data} />
      )}
      {related.isLoading && <Loading />}
      {related.error && <Error>Contact an administrator</Error>}
    </PageWrapper>
  );
}
