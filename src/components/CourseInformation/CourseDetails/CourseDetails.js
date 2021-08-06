const CourseDetails = ({ detail }) => {
  console.log(detail);
  return (
    <div>
      <div className="flex flex-row items-center text-icon-blue gap-1">
        <ion-icon name={detail.icon}></ion-icon>
        <h2 className="font-semibold font-sans">
          {detail.name === "" ? "N/A" : detail.name}
        </h2>
      </div>
      <div className="border rounded-md px-2 py-1 text-sm min-w-full">
        {detail.value === "" ? "N/A" : detail.value}
      </div>
    </div>
  );
};

export default CourseDetails;
