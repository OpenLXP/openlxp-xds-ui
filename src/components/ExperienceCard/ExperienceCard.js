import React from 'react';

const experienceCard = (props) => {

    let result = (
        <div className="col span-1-of-4 box">
            Error Loading Course Card.
        </div>
    )

    if (props.courseObj && props.courseObj.Course) {
        result = (
            <div className="col span-1-of-4 box">
                <img src={props.courseObj.CourseThumbnail} alt="test" />
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

export default experienceCard;
