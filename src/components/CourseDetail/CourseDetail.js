import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';

import ExperienceCard from '../ExperienceCard/ExperienceCard';

/* helper method to get an icon given its backend-configured name */
const getIconByName = (name) => {
    switch (name) {
        case "clock":
            return (
                <ion-icon name="time-outline">
                </ion-icon>
            )
        case "hourglass":
            return (
                <ion-icon name="hourglass-outline">
                </ion-icon>
            )
        case "user":
            return (
                <ion-icon name="person-outline">
                </ion-icon>
            )
        case "multi-users":
            return (
                <ion-icon name="people-outline">
                </ion-icon>
            )
        case "location":
            return (
                <ion-icon name="location-outline">
                </ion-icon>
            )
        default:
            return (
                <ion-icon name="calendar-outline">
                </ion-icon>
            )
    }
}

/* CourseDetail Component to render the page when a course is selected from a
    search */
const CourseDetail = (props) => {

    const location = useLocation();
    const expObj = location.state.expObj;
    const imgLink = location.state.imgLink;
    const api_url = process.env.REACT_APP_ES_MLT_API;
    let cardSection = (
        <div>
            Error Loading Related card.
        </div>
    )

    // state to keep track of all the related course found
    const [coursesState, setCoursesState] = useState({
        coursesObj: null,
        isLoading: false,
        error: null
    });

    // global config state
    const { configuration } = useSelector((state) => state.configuration);
    let courseDetails = [];

    // Fetch similar courses from elastic search
    useEffect(() => {
        let url = api_url + expObj.meta.id;
        // set the loading state
        setCoursesState(previousState => {
            const resultState = {
                coursesObj: null,
                isLoading: true,
                error: null
            }
            return resultState
        });
        axios.get(url)
            .then(response => {
                setCoursesState(previousState => {
                    return {
                        coursesObj: response.data,
                        isLoading: false,
                        error: null
                    }
                });
            })
            .catch(err => {
                setCoursesState(previousState => {
                    return {
                        coursesObj: null,
                        isLoading: false,
                        error: err
                    }
                })
            });
    }, [expObj.meta.id, api_url])

    // showing loading text when the api call is in progress
    if (coursesState.isLoading === true) {
        cardSection = (
            <div className="center-text">Loading...</div>
        )
        // once the api call is done and it's not an error we load the previews
    } else if (coursesState.coursesObj && coursesState.isLoading === false) {
        cardSection = (
            coursesState.coursesObj.hits.map((course, idx) => {
                return <ExperienceCard courseObj={course} key={idx} />
            })
        );
    }

    // if configuration is loaded and has course detail config
    if (configuration && configuration.course_highlights) {

        for (let x = 0; x < configuration.course_highlights.length; x++) {
            let curr = configuration.course_highlights[x];
            let col1 = null;
            let col2 = null;
            let col1Icon = getIconByName(curr.highlight_icon);

            col1 = (
                <div className="col span-1-of-2">
                    {col1Icon}
                    {curr.display_name}: {expObj[curr.field_name]}
                </div>
            )

            x += 1;

            if (x < configuration.course_highlights.length) {
                curr = configuration.course_highlights[x];
                let col2Icon = getIconByName(curr.highlight_icon);

                col2 = (
                    <div className="col span-1-of-2">
                        {col2Icon}
                        {curr.display_name}: {expObj[curr.field_name]}
                    </div>
                )
            }

            courseDetails.push(
                <div className="row">
                    {col1}
                    {col2}
                </div>
            )
        }
    }

    return (
        <div className="content-section">
            <div className="row content-panel course-detail">
                <div className="inner-content">
                    <h2>{expObj.Course.CourseTitle}</h2>
                    <div className="row">
                        <div className="col span-2-of-5">
                            <img
                                src={imgLink}
                                alt="Course thumbnail" />
                            <a href={expObj.Course.CourseURL}
                                className="btn">
                                View Course
                            </a>
                        </div>
                        <div className="col span-3-of-5">
                            <p>{expObj.Course.CourseDescription}</p>

                            <div className="row course-highlights">
                                {courseDetails.map((row, idx) => {
                                    return row;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-panel course-related">
                <h4>Related</h4>
                <div className='row card-section'>
                    {cardSection}
                </div>
            </div>
        </div>
    )
}

export default CourseDetail;
