import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchConfiguration } from "./store/configuration";

import Layout from "./hoc/Layout/Layout";
import Home from "./pages/Home";

import ManageInterestLists from "./pages/ManageInterestsLists";

import { setUserStatus } from "./store/user";
import axios from "axios";
import SearchInterestLists from "./pages/SearchInterestLists";
import FilterSearch from "./pages/FilterSearch";
import ManageSubscriptions from "./pages/ManageSubscriptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Course from "./pages/Course";
import SearchResults from "./pages/SearchResults";
import ManageSavedSearches from "./pages/ManageSavedSearches";
import EditSavedSearch from "./pages/EditSavedSearch";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);

  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search/" component={SearchResults} />
      <Route path="/about" />
      <Route path="/resources" />
      <Route path="/help" />
      <Route path="/course/:id" component={Course} />
      {/* <Route path="/filter-search" component={FilterSearch} /> */}
      <Route path="/filter-search" component={EditSavedSearch} />
      {user && <Route path="/saved-searches" component={ManageSavedSearches} />}
      {!user && <Route path="/signIn" component={Login} />}
      {!user && <Route path="/signUp" component={Register} />}
      {user && (
        <Route path="/manageinterestlists" component={ManageInterestLists} />
      )}
      {user && (
        <Route path="/managesubscriptions" component={ManageSubscriptions} />
      )}
      {user && <Route path="/filter-search/" component={FilterSearch} />}
      {user && (
        <Route path="/searchinterestlists/" component={SearchInterestLists} />
      )}
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchConfiguration());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(setUserStatus());
  }, []);

  useEffect(() => {
    if (user?.token) {
      const url = process.env.REACT_APP_USER_SUBSCRIPTION_LISTS;
      // validate with back end
      axios
        .get(url, {
          headers: { Authorization: `Token ${user?.token}` },
        })
        .catch(() => {
          localStorage.removeItem("state");
        });
    }
  }, [user]);

  return (
    <div className="main-container">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
