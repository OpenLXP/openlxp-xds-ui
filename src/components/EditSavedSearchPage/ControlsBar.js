export default function ControlsBar({
  total,
  page,
  numberResultsPerPage,
  onClickNext,
  onClickBack,
}) {
  console.log(Math.floor(total / numberResultsPerPage));

  let buttonStyle =
    "flex justify-center items-center gap-1 bg-base-blue hover:bg-dark-blue transition-colors duration-150 ease-in-out text-white cursor-pointer rounded-md";
  let getNumberOfPages = () => {
    return Math.floor(total / numberResultsPerPage);
  };
  return (
    <div className="flex flex-row justify-between my-4">
      <div className="font-sans font-semibold text-lg">Total: {total}</div>
      <div className="flex gap-2">
        <div
          className={`${
            page < 2 ? "invisible" : "block"
          } ${buttonStyle} + pr-1.5`}
          onClick={onClickBack}>
          <ion-icon name="chevron-back-outline" />
          Back
        </div>
        {getNumberOfPages() > 1 ? page : null}
        <div
          className={`${
            page > getNumberOfPages() ? "invisible" : "block"
          } ${buttonStyle} + pl-1.5`}
          onClick={onClickNext}>
          Next
          <ion-icon name="chevron-forward-outline" />
        </div>
      </div>
    </div>
  );
}
