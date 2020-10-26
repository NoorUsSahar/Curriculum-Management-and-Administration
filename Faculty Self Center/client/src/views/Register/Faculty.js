import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Faculty = ({
  register,
  auth: { loading, isAuthenticated },
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      //console.log('Password donot match');
      setAlert("Passwords do not match", "danger");
    } else {
      // console.log("SUCCESS");
      register({ name, email, password });
         }
  };

  if (!loading && isAuthenticated ) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container className='container-primary'>
        <Paper elevation={4} className='paper-primary'>
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className='text-center-horizontal'
            >
              <Typography
                align='center'
                className='title-secondary'
                color='primary'
              >
                Faculty Registeration
              </Typography>
              <div className='description-secondary text-center'>
                Please fill in the form
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <TextField
                  className='form-control'
                  label='Name'
                  variant='outlined'
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <TextField
                  className='form-control'
                  label='Email'
                  variant='outlined'
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <TextField
                  className='form-control'
                  label='Password'
                  variant='outlined'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <TextField
                  className='form-control'
                  label='Password2'
                  variant='outlined'
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  className='form-control'
                >
                  Login
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

Faculty.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert })(Faculty);
