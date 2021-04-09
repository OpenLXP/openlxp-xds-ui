import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConfiguration } from './store/configuration';

import Layout from './hoc/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';
import SearchResultPage from './components/SearchResultsPage/SearchResultsPage';
import CourseDetail from './components/CourseDetail/CourseDetail';


function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.configuration);

  let routes = (
    <Switch>
      <Route path="/search/" component={SearchResultPage} />
      <Route path="/about" />
      <Route path="/resources"/>
      <Route path="/help"/>
      <Route path="/signIn"/>
      <Route path="/course" component={CourseDetail} />
      <Route path="/" exact component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchConfiguration())
    }
  }, [status, dispatch]);

  return (
    <div className="main-container">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
