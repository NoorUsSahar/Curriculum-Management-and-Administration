import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbars/Landing';
import Faculty from '../views/Register/Faculty';
import Alert from '../components/Alert/Alert';

const Register = () => {
  const switchRoutes = (
    <Switch>
      <Route exact path='/register' component={Faculty} />
      {/* <Redirect from='/register' to='/register/applicant' /> */}
    </Switch>
  );

  return (
    <Fragment>
      <Navbar />
      <Alert />
      {switchRoutes}
    </Fragment>
  );
};

export default Register;
