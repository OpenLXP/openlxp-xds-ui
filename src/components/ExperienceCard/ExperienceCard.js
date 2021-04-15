import React from 'react';
import { useSelector } from 'react-redux';

import no_img from '../../resources/vendors/img/no-image2.png'

const ExperienceCard = (props) => {

    let result = (
        <div className="col span-1-of-4 box">
            Error Loading Course Card.
        </div>
    )

    let courseThumbnail = no_img;
    const { configuration } = useSelector((state) => state.configuration);
    const backendHost = process.env.REACT_APP_BACKEND_HOST;
    // default style if no image is provided
    let style = {
        backgroundColor: 'rgb(243 243 243)'
    };

    // if configuration is loaded and there is an image fallback, use that
    if (configuration && configuration.course_img_fallback) {
        courseThumbnail = backendHost + configuration.course_img_fallback;
        style = null;
    }

    // override the default img if one is passed in
    if (props.courseObj && props.courseObj.CourseThumbnail 
            && props.courseObj.CourseThumbnail !== '') {
        courseThumbnail = props.courseObj.CourseThumbnail;
        style = null;
    }

    // Only display a card if the course object is not null
    if (props.courseObj && props.courseObj.Course) {
        result = (
            <div className="col span-1-of-4 box">
                <img 
                    src={courseThumbnail} 
                    alt="Course thumbnail" 
                    style={style}/>
                <div className="card-detail">
                    <div className="row card-title">
                        <b><a href="www.google.com">
                        {props.courseObj.Course.CourseTitle ? 
                            props.courseObj.Course.CourseTitle : 
                            "Missing Course Title"}
                    </a></b>
                    </div>
                    
                    <div className="icon-section">
                        <div className="icon-block">
                            <ion-icon name="business-outline"></ion-icon>
                        </div>
                        <div className="course-highlights">
                            {props.courseObj.Course.CourseProviderName ? 
                                props.courseObj.Course.CourseProviderName :
                                "N/A"}
                        </div>
                    </div>
                    <div>
                        <div className="icon-block">
                            <ion-icon name="archive-outline"></ion-icon>
                        </div>
                        <div className="course-highlights">
                            {props.courseObj.Course.DepartmentName ?
                                props.courseObj.Course.DepartmentName :
                                "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return result;
}

export default ExperienceCard;
