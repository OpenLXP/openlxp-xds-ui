import React from 'react';
import { Link } from 'react-router-dom'

/* This component represents a course preview panel for a quick view of course
    search results */
const ExpPreviewPanel = (props) => {

    return (
        <div className="row exp-panel">
            <div className="col span-1-of-4">
                <img src={props.imgLink} alt="Course thumbnail" />
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
                    {props.expObj.Course.CourseDescription ?
                        props.expObj.Course.CourseDescription : "N/A"}
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
