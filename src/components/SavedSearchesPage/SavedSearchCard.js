import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SavedSearchCard({
  savedSearch,
  userToken,
  getSavedSearches,
}) {
  let { name, query, id } = savedSearch;
  const history = useHistory();

  const handleEdit = () => {
    console.log(id);
    history.push({
      pathname: "/filter-search",
      search: query,
      state: { name, id },
    });
  };
  const handleView = () => {
    history.push("/filter-search?" + query);
  };
  const handleDelete = () => {
    const url = process.env.REACT_APP_BACKEND_HOST + "/api/saved-filters/" + id;
    const headers = {
      Authorization: "Token " + userToken,
    };
    axios.delete(url, { headers: headers }).then((resp) => {
      console.log(resp);
      getSavedSearches();
    });
  };
  return (
    <div className="flex flex-row p-2 justify-between bg-white shadow-sm hover:shadow transition-shadow duration-200 ease-in-out rounded-md ">
      <div>
        <div className="font-sans font-semibold">{name}</div>
        <div className="font-sans text-xs text-gray-400">{query}</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div
          className="flex items-center transition-colors duration-150 ease-in-out justify-center p-2 rounded-md bg-base-blue bg-opacity-10 text-base-blue hover:text-dark-blue hover:bg-opacity-20 cursor-pointer"
          onClick={handleView}  data-testid="view-button">
          <ion-icon name="eye-outline" />
        </div>
        <div
          className="flex items-center transition-colors duration-150 ease-in-out justify-center p-2 rounded-md bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200 cursor-pointer"
          onClick={handleEdit} data-testid="edit-button">
          <ion-icon name="create-outline" />
        </div>
        <div
          className="flex items-center transition-colors duration-150 ease-in-out justify-center p-2 rounded-md bg-red-100 text-red-600 hover:text-red-800 hover:bg-red-200 cursor-pointer"
          onClick={handleDelete} data-testid="delete-button">
          <ion-icon name="trash-outline" />
        </div>
      </div>
    </div>
  );
}
