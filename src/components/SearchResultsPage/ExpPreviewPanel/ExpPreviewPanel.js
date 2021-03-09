import React from 'react';

const ExpPreviewPanel = (props) => {

    return (
        <div className="row exp-panel">
            <div className="col span-1-of-4">
                <img src={props.imgLink} alt="test" />
            </div>
            <div className="col span-3-of-4">
                <div className="row exp-title">
                    <b><a href="www.google.com" data-testid="exp-prev-title">
                        {props.expObj.Course.CourseTitle ? 
                            props.expObj.Course.CourseTitle : "N/A"}
                    </a></b>
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
