import React from 'react';
import Aux from '../../../hoc/Auxil';

const FilterGroup = (props) => {
    const groupObj = props.groupObj;

    return (
        <div className="filter-section">
            <h3>{groupObj.title}</h3>
            {groupObj.values.map((val, idx) => {
                return (
                    <>
                        <input type="checkbox"
                            id={val}
                            name={val}
                            value={val} />
                        <label htmlFor={val}> {val}</label>
                        <br></br>
                    </>
                )
            })}
        </div>
    )
}

export default FilterGroup;
