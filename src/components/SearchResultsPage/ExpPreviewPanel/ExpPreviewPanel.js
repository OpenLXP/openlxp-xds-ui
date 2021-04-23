import React from 'react';
import { Link } from 'react-router-dom'


// Random number gen for styling cards
const generateRandomNumber = (max) => {
    return Math.round(Math.random() * max);
};

/* This component represents a course preview panel for a quick view of course
    search results */
const ExpPreviewPanel = (props) => {

    let altImg = (
        <div
          style={{
            // Generating a unique linear gradient
            backgroundImage: `linear-gradient(${generateRandomNumber(
              270
            )}deg, #2f6194 ${generateRandomNumber(50)}%, #0b3d70)
        `,
            height: "175px",
            width: "100%",
            color: "#fff",
            textAlign: "center",
            paddingTop: "30%",
            fontSize: "1rem",
          }}
        >
          No Image Available
        </div>
      );

    const defaultImg = <img src={props.imgLink} alt="Course thumbnail" />

    let img = props.imgLink ? defaultImg : altImg;

    return (
        <div className="row exp-panel">
            <div className="col span-1-of-4">
                {img}
            </div>
            <div className="col span-3-of-4">
                <div className="row exp-title">
                    <b><Link
                    to={{
                        pathname: "/course/" + props.expObj.meta.id,
                        state: {
                            expObj: props.expObj,
                            imgLink: props.imgLink
                        }
                    }}
                    data-testid="exp-prev-title"
                    className="btn">
                        {props.expObj.Course.CourseTitle ? 
                            props.expObj.Course.CourseTitle : "N/A"}
                    </Link></b>
                </div>
                <div className="row exp-desc" data-testid="exp-prev-desc">
                    {props.expObj.Course.CourseShortDescription ?
                        props.expObj.Course.CourseShortDescription : "N/A"}
                </div>
                <div className="row exp-provider" data-testid="exp-prev-provider">
                    {props.expObj.Course.CourseProviderName ? 
                        props.expObj.Course.CourseProviderName : "N/A"}
                </div>
            </div>

        </div>
    )
}

export default ExpPreviewPanel;
