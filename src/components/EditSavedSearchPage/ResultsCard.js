import { useHistory } from "react-router-dom";

export default function ResultsCard({ title, provider = null, viewCourse }) {
  const history = useHistory();

  return (
    <div className="flex flex-row p-2 justify-between bg-white shadow-sm hover:shadow transition-shadow duration-200 ease-in-out rounded-md gap-6">
      <div>
        <div className="font-sans font-semibold line-clamp-1">{title}</div>
        <div className="font-sans text-sm">{provider}</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <a
          className="flex p-2 gap-2 items-center transition-colors duration-150 ease-in-out justify-center rounded-md bg-base-blue bg-opacity-10 text-base-blue hover:text-dark-blue hover:bg-opacity-20  border-base-blue border-2 border-opacity-20 hover:border-opacity-0 cursor-pointer"
          onClick={viewCourse}>
          <ion-icon name="eye-outline" />
          View
        </a>
      </div>
    </div>
  );
}
