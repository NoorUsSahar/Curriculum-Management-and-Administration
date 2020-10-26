import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminPrivateRoute = ({
  auth: { loading, isAuthenticated, user },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading && !isAuthenticated ? (
          <Redirect to='/login/admin' />
        ) : !loading && isAuthenticated && user !== null && user.type !== 0 ? (
          <Redirect to='/login/admin' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPrivateRoute);
