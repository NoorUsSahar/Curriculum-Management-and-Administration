import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbars/Landing';
import Applicant from '../views/Register/Applicant';
import Alert from '../components/Alert/Alert';

const Register = () => {
  const switchRoutes = (
    <Switch>
      <Route path='/register/applicant' component={Applicant} />
      <Redirect from='/register' to='/register/applicant' />
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
