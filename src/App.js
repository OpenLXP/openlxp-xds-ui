import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';
import SearchResultPage from './components/SearchResultsPage/SearchResultsPage';
import CourseDetail from './components/CourseDetail/CourseDetail';


function App() {

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

  return (
    <div className="main-container">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
