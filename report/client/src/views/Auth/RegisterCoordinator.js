import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '../../components/Button/Button.js';
import { connect } from 'react-redux';
import { registerCoordinator } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
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
      lineHeight: '1'
    }
  }
};

const useStyles = makeStyles(styles);

const RegisterCoordinator = ({
  registerCoordinator,
  auth: { user, loading, isAuthenticated },
  history,
  setAlert
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const { name, email, password, cpassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== cpassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerCoordinator(formData, history);
    }
  };

  //   if (!loading && isAuthenticated && user !== null && user.type === 1) {
  //     return <Redirect to='/login' />;
  //   }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 class={classes.cardTitleWhite}>Register Coordinator</h4>
            <p class={classes.cardCategoryWhite}>
              Add the details below to register a new coordinator
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem>
                  <TextField
                    className='form-control'
                    label='Name'
                    vairant='outlined'
                    type='text'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    className='form-control'
                    label='Email'
                    vairant='outlined'
                    type='text'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    className='form-control'
                    label='Password'
                    vairant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    className='form-control'
                    label='Confirm Password'
                    vairant='outlined'
                    type='password'
                    name='cpassword'
                    value={cpassword}
                    onChange={e => onChange(e)}
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

RegisterCoordinator.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerCoordinator: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticate,
  auth: state.auth
});

export default connect(mapStateToProps, { registerCoordinator, setAlert })(
  withRouter(RegisterCoordinator)
);
