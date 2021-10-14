import React from "react";

/* This component represents a single filter group in the filter menu */
const FilterGroup = (props) => {
  const groupObj = props.groupObj;

  return (
    <div className="bg-white rounded-md px-2 pt-2 pb-4">
      <h3 className="font-semibold">{groupObj.title}</h3>
      {/* We filter out empty check boxes */}
      {groupObj.values
        .filter((valObj) => {
          if (valObj.key === "") {
            return false;
          }
          return true;
        })
        .map((valObj, idx) => {
          // this is used to set the checkbox to checked or unchecked
          // using the parameters passed in the url
          let paramVal = props.paramObj[groupObj.fieldName];
          const checkedResult = (
            <div key={idx} className="flex flex-row items-center space-x-2">
              <input
                type="checkbox"
                id={valObj.key.replace(" ", "")}
                name={valObj.key}
                value={valObj.key}
                onChange={props.onChange}
                checked
              />
              <label htmlFor={valObj.key.replace(" ", "")} className="text-2xs">
                {valObj.key} ({valObj.doc_count})
              </label>
            </div>
          );

          const defaultResult = (
            <div
              key={idx}
              className="flex flex-row items-center space-x-2 py-0.5"
            >
              <input
                type="checkbox"
                id={valObj.key}
                name={valObj.key}
                value={valObj.key}
                onChange={props.onChange}
              />
              <label htmlFor={valObj.key} className="text-2xs">
                {valObj.key} ({valObj.doc_count})
              </label>
            </div>
          );

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
  );
};

export default FilterGroup;
