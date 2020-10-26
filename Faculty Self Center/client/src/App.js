import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Dashboard from './views/Dashboard/Dashboard.js';
import Login from './layouts/Login';
import Register from './layouts/Register';
// import Applicant from './layouts/Applicant';
import Profiles from './views/Profiles/Profiles'

import store from './utils/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadFaculty } from './actions/auth';
import Faculty from './layouts/Faculty'
import FacultyPrivateRoute from './components/Routing/FacultyPrivateRoute';
// import ApplicantPrivateRoute from './components/Routing/ApplicantPrivateRoute';

import './assets/scss/App.scss';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadFaculty());
  }, [loadFaculty()]);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
          {/* <FacultyPrivateRoute exact path='/faculty/dashboard' component={Dashboard} /> */}
          <FacultyPrivateRoute path='/faculty' component={Faculty} />
           
            {/* <FacultyPrivateRoute exact path='/dashboard' component={Faculty} /> */}
            {/* <ApplicantPrivateRoute path='/applicant' component={Applicant} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
             {/* <Route  path="/admin" component={Admin}></Route> */}
             {/* <Route exact path="/profiles" component={Profiles}></Route> */}
              {/* <Route exact path="/profile/:id" component={Profile}></Route> */}
              
             
              
            <Redirect from='/' to='/login' />
          
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
