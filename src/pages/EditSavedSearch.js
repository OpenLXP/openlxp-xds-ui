import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import PageWrapper from "../components/common/PageWrapper";
import axios from "axios";
import ResultsCard from "../components/EditSavedSearchPage/ResultsCard";
import Title from "../components/common/text/Title";
import { useSelector } from "react-redux";
import ControlsBar from "../components/EditSavedSearchPage/ControlsBar";
import SearchForm from "../components/EditSavedSearchPage/SearchForm";
import UpdateButton from "../components/EditSavedSearchPage/UpdateButton";
import TitleInput from "../components/EditSavedSearchPage/TitleInput";
import CreateButton from "../components/EditSavedSearchPage/CreateButton";

export default function EditSavedSearch() {
  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);

  const history = useHistory();
  const location = useLocation();

  const [params, setParams] = useState({
    "Course.CourseTitle": "",
    "Course.CourseProviderName": "",
    "CourseInstance.CourseLevel": "",
    "p": 1,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [queryInfo, setQueryInfo] = useState({ ...location.state });
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  const handleQueryNameChange = (event) => {
    setQueryInfo({ ...queryInfo, [event.target.name]: event.target.value });
  };
  const callBackend = () => {
    // state of the axios call
    setResults({
      isLoading: true,
      data: null,
      error: null,
    });
    // hitting the backend with the location search params
    let url = `${process.env.REACT_APP_ES_API}filter-search${location.search}`;
    axios
      .get(url)
      .then((resp) => {
        setResults({
          isLoading: false,
          data: resp.data,
          error: null,
        });
        setTotal(resp.data.total);
      })
      .catch((error) => {
        setResults({
          isLoading: false,
          data: null,
          error: error,
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let locationOBJ = {
      pathname: "edit-filter-search",
      search: `?Course.CourseTitle=${
        params["Course.CourseTitle"] || ""
      }&Course.CourseProviderName=${
        params["Course.CourseProviderName"] || ""
      }&CourseInstance.CourseLevel=${
        params["CourseInstance.CourseLevel"] || ""
      }&p=${1}`,
    };
    if (location.state && user) {
      locationOBJ.state = location.state;
    }

    history.replace(locationOBJ);
  };
  const getNextPage = () => {
    history.replace({
      path: "edit-filter-search?",
      search: queryString.stringify({ ...params, p: parseInt(params.p) + 1 }),
      state: location.state,
    });
  };
  const getPreviousPage = () => {
    history.replace({
      path: "edit-filter-search?",
      search: queryString.stringify({ ...params, p: parseInt(params.p) - 1 }),
      state: location.state,
    });
  };

  const handleCreateNewList = () => {
    let url = process.env.REACT_APP_BACKEND_HOST + "/api/saved-filters";

    let headers = {
      Authorization: "Token " + user?.token,
    };
    let data = {
      name: queryInfo.name,
      query: queryString.stringify({ ...params, p: 1 }),
    };
    setIsUpdating(true);
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        setQueryInfo({ name: response.data.name, query: response.data.query });
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsUpdating(false);
      });
    history.replace({
      path: "edit-filter-search?",
      search: queryString.stringify({ ...params, p: parseInt(params.p) }),
      state: queryInfo,
    });
  };
  const handleUpdate = () => {
    let url =
      process.env.REACT_APP_BACKEND_HOST +
      "/api/saved-filters/" +
      location.state.id;

    let headers = {
      Authorization: "Token " + user?.token,
    };
    let data = {
      name: queryInfo.name,
      query: queryString.stringify(params),
    };
    setIsUpdating(true);
    axios
      .patch(url, data, { headers: headers })
      .then((response) => {
        console.log("YOU DID IT!");
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsUpdating(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setParams(queryString.parse(location.search));
      callBackend();
    }
    return () => {
      isMounted = false;
    };
  }, [location.search]);
  console.log(location);
  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center mt-8 mb-2">
        {location?.state !== undefined && user && (
          <TitleInput
            titleValue={queryInfo.name}
            onChange={handleQueryNameChange}
          />
        )}
        {!location?.state && user && (
          <TitleInput
            titleValue={queryInfo.name}
            onChange={handleQueryNameChange}
          />
        )}
        {!user && <Title title={"Create a custom search"} />}
        {!location?.state && user && (
          <CreateButton isUpdating={false} onClick={handleCreateNewList} />
        )}
        {location?.state && user && (
          <UpdateButton isUpdating={isUpdating} onClick={handleUpdate} />
        )}
      </div>
      <SearchForm
        params={params}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ControlsBar
        total={total}
        page={params.p}
        numberResutlsPerPage={configuration?.search_results_per_page}
        onClickNext={getNextPage}
        onClickBack={getPreviousPage}
      />
      {results.isLoading && "Loading..."}
      {!results.isLoading && !results.error && (
        <div className="flex flex-col gap-2 rounded-md mb-8">
          {results.data?.hits?.map((course) => {
            let { id } = course.meta;
            let { CourseTitle, CourseProviderName } = course.Course;
            return (
              <ResultsCard
                title={CourseTitle}
                provider={CourseProviderName}
                id={id}
              />
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}
