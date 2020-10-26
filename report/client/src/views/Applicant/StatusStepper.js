import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const StatusStepper = ({ status }) => {
  return (
    <Fragment>
      <Stepper activeStep={status} alternativeLabel>
        <Step>
          <StepLabel>Personal Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Income Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Education Details</StepLabel>
        </Step>
      </Stepper>
    </Fragment>
  );
};

StatusStepper.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusStepper;
