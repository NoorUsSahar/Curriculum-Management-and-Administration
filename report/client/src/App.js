import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Admin from './layouts/Admin.js';
import Login from './layouts/Login';
import Register from './layouts/Register';
import Applicant from './layouts/Applicant';

import store from './utils/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import AdminPrivateRoute from './components/Routing/AdminPrivateRoute';
import ApplicantPrivateRoute from './components/Routing/ApplicantPrivateRoute';

import './assets/scss/App.scss';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <AdminPrivateRoute path='/admin' component={Admin} />
            <ApplicantPrivateRoute path='/applicant' component={Applicant} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Redirect from='/' to='/login' />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
