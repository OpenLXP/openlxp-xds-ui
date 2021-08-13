import React, {useEffect} from "react";
import "./App.css";
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchConfiguration} from "./store/configuration";

import Layout from "./hoc/Layout/Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import CustomSearch from "./components/CustomSearch/CustomSearch";
import SearchResultPage from "./components/SearchResultsPage/SearchResultsPage";
import CourseInformation
  from "./components/CourseInformation/CourseInformation";
import ManageInterestlists
  from "./components/ManageInterestLists/ManageInterestLists";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {setUserStatus} from "./store/user";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);

  let routes = (
    <Switch>
      <Route path="/search/" component={SearchResultPage}/>
      <Route path="/about"/>
      <Route path="/resources"/>
      <Route path="/manageinterestlists" component={ManageInterestlists}/>
      <Route path="/help"/>
      <Route path="/customsearch/" component={CustomSearch}/>
      <Route path="/signIn" component={SignIn}/>
      <Route path="/course/:id" component={CourseInformation}/>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/signup" component={SignUp}/>
      <Redirect to="/"/>
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
    if (user) {
      const url = process.env.REACT_APP_INTEREST_LISTS;
      // validate with back end
      axios
        .get(url, {
          headers: { Authorization: `Token ${user.token}` },
        })
        .then()
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
