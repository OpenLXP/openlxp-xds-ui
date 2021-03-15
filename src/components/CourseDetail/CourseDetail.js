import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import ExperienceCard from '../ExperienceCard/ExperienceCard';

/* CourseDetail Component to render the page when a course is selected from a
    search */
const CourseDetail = (props) => {

    const location = useLocation();
    const expObj = location.state.expObj;
    const imgLink = location.state.imgLink;
    const api_url = 'http://localhost:8080/es-api/more-like-this/';
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
                console.log(response.data);
                setCoursesState(previousState => {
                    return {
                        coursesObj: response.data,
                        isLoading: false,
                        error: null
                    }
                });
            })
            .catch(err => {
                console.log(err)
                setCoursesState(previousState => {
                    return {
                        coursesObj: null,
                        isLoading: false,
                        error: err
                    }
                })
            });
    }, [expObj.meta.id])

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

    return (
        <div className="content-section">
            <div className="row content-panel course-detail">
                <div className="inner-content">
                    <h2>{expObj.Course.CourseTitle}</h2>
                    <div className="row">
                        <div className="col span-2-of-5">
                            <img 
                                src={imgLink} 
                                alt="Course thumbnail"/>
                            <a href={expObj.Course.CourseURL} 
                               className="btn">
                                   View Course
                            </a>
                        </div>
                        <div className="col span-3-of-5">
                            <p>{expObj.Course.CourseDescription}</p>

                            <div className="row course-highlights">
                                <div className="row">
                                    <div className="col span-1-of-2">
                                        <ion-icon name="time-outline">
                                        </ion-icon>
                                        Start Date: 
                                    </div>
                                    <div className="col span-1-of-2">
                                        <ion-icon name="time-outline">
                                        </ion-icon>
                                        End Date: 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col span-1-of-2">
                                        <ion-icon name="hourglass-outline">
                                        </ion-icon>
                                        Duration:
                                    </div>
                                    <div className="col span-1-of-2">
                                        <ion-icon name="calendar-outline">
                                        </ion-icon>
                                        Date Last Modified:
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col span-1-of-2">
                                        <ion-icon name="person-outline">
                                        </ion-icon>
                                        Author:
                                    </div>
                                    <div className="col span-1-of-2">
                                        <ion-icon name="location-outline">
                                        </ion-icon>
                                        Location:
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col span-1-of-2">
                                        <ion-icon name="person-outline">
                                        </ion-icon>
                                        Instructor:
                                    </div>
                                    <div className="col span-1-of-2">
                                        <ion-icon name="people-outline">
                                        </ion-icon>
                                        Course Audience:
                                    </div>
                                </div>
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
