import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, Slide } from '@material-ui/core';

const Alert = ({ alert }) => {
  const transitionUp = (props) => {
    return <Slide {...props} direction='up' />;
  };

  const [transition, setTransition] = useState(() => transitionUp);

  return (
    <Fragment>
      <Snackbar
        open={alert !== '' ? true : false}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={alert}
        TransitionComponent={transition}
      />
    </Fragment>
  );
};

Alert.propTypes = {
  alert: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
