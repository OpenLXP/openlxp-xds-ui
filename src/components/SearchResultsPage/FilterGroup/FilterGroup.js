import React from 'react';

/* This component represents a single filter group in the filter menu */
const FilterGroup = (props) => {
    const groupObj = props.groupObj;

    return (
        <div className="filter-section">
            <h3>{groupObj.title}</h3>
            {/* We filter out empty check boxes */}
            {groupObj.values.filter((valObj) => {
                if (valObj.key === '') {
                    return false;
                }
                return true;
            }).map((valObj, idx) => {
                // this is used to set the checkbox to checked or unchecked
                // using the parameters passed in the url
                let paramVal = props.paramObj[groupObj.fieldName];
                const checkedResult = (
                    <React.Fragment key={idx}>
                        <input type="checkbox" 
                            id={valObj.key.replace(' ', '')}
                            name={valObj.key}
                            value={valObj.key}
                            onChange={props.onChange} 
                            checked />
                        <label htmlFor={valObj.key.replace(' ', '')} >
                            {valObj.key} ({valObj.doc_count})
                        </label>
                    </React.Fragment>
                )
            
                const defaultResult = (
                    <React.Fragment key={idx}>
                        <input type="checkbox"
                            id={valObj.key}
                            name={valObj.key}
                            value={valObj.key}
                            onChange={props.onChange} />
                        <label htmlFor={valObj.key}>
                            {valObj.key} ({valObj.doc_count})
                        </label>
                        <br></br>
                    </React.Fragment>
                )

                if (paramVal) {
                    if (Array.isArray(paramVal)) {
                        if (paramVal.includes(valObj.key)) {
                            return checkedResult;
                        } else {
                            return defaultResult;
                        }
                    } else {
                        if (paramVal === valObj.key) {
                            return checkedResult;
                        } else {
                            return defaultResult;
                        }
                    }
                } else {
                    return defaultResult;
                }
            })}
        </div>
    )
}

export default FilterGroup;
