import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ApplicantPrivateRoute = ({
  auth: { loading, isAuthenticated, user },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading && !isAuthenticated ? (
          <Redirect to='/login/applicant' />
        ) : !loading && isAuthenticated && user !== null && user.type !== 3 ? (
          <Redirect to='/login/applicant' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

ApplicantPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ApplicantPrivateRoute);
