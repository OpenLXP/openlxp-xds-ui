import React from "react";
import { Link } from "react-router-dom";

/* This component represents a course preview panel for a quick view of course
    search results */
const ExpPreviewPanel = (props) => {
  let altImg = (
    <div className="flex flex-grow-0 flex-shrink-0  justify-center items-center h-28 w-44 bg-gradient-to-r from-dark-blue to-base-blue text-white text-center relative">
      <div>No image available</div>
    </div>
  );

  const defaultImg = (
    <div className='flex justify-center items-center h-28 w-44 object-cover text-white text-center relative'>
      <img src={props.imgLink} alt="Course thumbnail" />
    </div>
  );

  let img = props.imgLink ? defaultImg : altImg;

  return (
    <div className="flex flex-row py-2 items-start">
      <div className="">{img}</div>
      <div className="flex flex-col px-2 h">
        <div className="font-sans font-medium text-2xl">
          <Link
            to={{
              pathname: "/course/" + props.expObj.meta.id,
              state: {
                expObj: props.expObj,
                imgLink: props.imgLink,
              },
            }}
            data-testid="exp-prev-title"
            className="">
            {props.expObj.Course.CourseTitle
              ? props.expObj.Course.CourseTitle
              : "N/A"}
          </Link>
        </div>
        <div className="font-sans font-normal" data-testid="exp-prev-desc">
          {props.expObj.Course.CourseShortDescription
            ? props.expObj.Course.CourseShortDescription
            : "N/A"}
        </div>
        <div className="font-sans font-thin" data-testid="exp-prev-provider">
          {props.expObj.Course.CourseProviderName
            ? props.expObj.Course.CourseProviderName
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ExpPreviewPanel;
