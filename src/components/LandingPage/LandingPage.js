import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import dummyJSON from '../../resources/dummy.json'

const LandingPage = (props) => {
    // state to keep track of typed input in search bar
    const [ state, setState] = useState({
        keyword: ''
    });

    const landingHeader = "Enterprise Course Catalog*"
    const landingSubHeader = "This catalog lets you search for all DoD "
        + "unclassified training and education courses, seminars, instructional"
        + " resources and more."
    const placeholderText = '';
    // TODO: replace this json obj with a real call to elasticsearch
    const dummy_json = dummyJSON;

    return (
        <div className="row landing-section">
            <h2>{landingHeader}</h2>
            <h5>{landingSubHeader}</h5>
            <div className="row">
                <input className="search" type="text"
                    placeholder={placeholderText} 
                    value={state.keyword}
                    data-testid='landing-search'
                    onChange={event => {
                        const newVal = event.target.value;
                        setState(previousState => ({keyword: newVal}))
                    }}/>
                <Link
                    to={{
                        pathname: "/search/",
                        search: "?keyword=" + state.keyword + "&p=" + 1
                    }}
                    className="btn">Search</Link>
            </div>
            <div className="row page-break">
            </div>
            <div className="row">
                <h4>Popular</h4>
                <div className='row card-section'>
                    {dummy_json.map((course, idx) => {
                        // for each course in the dummy json, render a card
                        return (
                            <ExperienceCard courseObj={course} key={idx} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
