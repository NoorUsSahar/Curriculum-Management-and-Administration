import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getCurrentApplicant,
  updateIncomeDetails,
} from '../../actions/applicant';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import StatusStepper from './StatusStepper';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    fontSize: '1.3rem',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const IncomeDetails = ({
  getCurrentApplicant,
  updateIncomeDetails,
  history,
  applicant: { loading, applicant },
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    monthlyIncome: '',
    minimumYearlyIncome: '',
  });

  const { monthlyIncome, minimumYearlyIncome } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateIncomeDetails(formData, history);
  };

  const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentApplicantCalled) {
      getCurrentApplicant();
      setGetCurrentApplicantCalled(true);
    }

    setFormData({
      monthlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.monthlyIncome
          : '',
      minimumYearlyIncome:
        !loading && applicant !== null && applicant.incomeDetails
          ? applicant.incomeDetails.minimumYearlyIncome
          : '',
    });
  }, [applicant]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Income Details</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your income details
            </p>
          </CardHeader>
          <CardBody>
            <StatusStepper
              status={!loading && applicant !== null ? applicant.status : 0}
            />
            <form onSubmit={(e) => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Monthly Income (Rs.)'
                    variant='outlined'
                    type='number'
                    name='monthlyIncome'
                    value={monthlyIncome}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Minimum Yearly Income (Rs.)'
                    variant='outlined'
                    type='number'
                    name='minimumYearlyIncome'
                    value={minimumYearlyIncome}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Submit
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

IncomeDetails.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  applicant: PropTypes.object.isRequired,
  updateIncomeDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  updateIncomeDetails,
})(withRouter(IncomeDetails));
