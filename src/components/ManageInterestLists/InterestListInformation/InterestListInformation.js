const InterestListInformation = (props) => {
  return (
    <>
      <h4 className="text-left mb-0 tracking-wider">Description</h4>
      <div className="px-2 shadow-sm py-2 font-sans text-sm border rounded-md">
        {props.info.description}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
        <div className="cols-span-1">
          <h4 className="tracking-wider text-left mb-0">Owner</h4>
          <div className="px-2 shadow-sm py-2 font-sans text-sm border rounded-md">
            {props.info.owner}
          </div>
        </div>
        <div className="cols-span-1">
          <div>
            <h4 className="tracking-wider text-left mb-0">Last Update</h4>
            <div className="px-2 shadow-sm py-2 font-sans text-sm border rounded-md">
              {props.info.updated}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestListInformation;
