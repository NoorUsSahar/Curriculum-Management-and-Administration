import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { createDepartment } from '../../actions/department';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

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

const CreateDepartment = ({ createDepartment, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { name, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createDepartment(formData, history);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Create Department</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to create a department
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
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
                label='Description'
                variant='outlined'
                type='text'
                rows={5}
                multiline
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
                required={true}
              />
              <Button
                color='primary'
                variant='contained'
                type='submit'
                size='large'
              >
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

CreateDepartment.propTypes = {
  createDepartment: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { createDepartment })(
  withRouter(CreateDepartment)
);
