import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Table from '../../components/Table/Table.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllDepartments } from '../../actions/department';
import { Link } from 'react-router-dom';

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

const ManageDepartments = ({
  getAllDepartments,
  department: { loading, departments },
}) => {
  const classes = useStyles();

  const [departmentsList, setDepartmentsList] = useState([]);

  const getDepartments = () => {
    let res = [];
    let i = 1;

    departmentsList.forEach((department) => {
      res = [
        ...res,
        [
          `${i}`,
          department.name,
          department.description,
          <Fragment>
            <Link
              to={`/admin/update-department/${department._id}`}
              className='text-decoration-none'
            >
              <Button
                color='secondary'
                variant='contained'
                className='margin-left-right margin-top-bottom'
              >
                Update
              </Button>
            </Link>
            <Button
              variant='contained'
              className='button-info margin-left-right margin-top-bottom'
            >
              Manage programs
            </Button>
          </Fragment>,
        ],
      ];

      i++;
    });

    return res;
  };

  const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

  useEffect(() => {
    if (!getAllDepartmentsCalled) {
      getAllDepartments();
      setGetAllDepartmentsCalled(true);
    }

    setDepartmentsList(!loading && departments.length > 0 ? departments : []);
  }, [departments]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Departments</h4>
            <p className={classes.cardCategoryWhite}>
              Below is a list of all the deparmtents
            </p>
          </CardHeader>
          <CardBody>
            <Link
              to='/admin/create-department'
              className='text-decoration-none'
            >
              <Button color='primary' variant='contained'>
                Add department
              </Button>
            </Link>
            {departmentsList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={['S.No', 'Name', 'Description', 'Actions']}
                tableData={getDepartments()}
              />
            ) : (
              <div className='text-center imp-message'>
                No departments found
              </div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ManageDepartments.propTypes = {
  getAllDepartments: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
});

export default connect(mapStateToProps, { getAllDepartments })(
  ManageDepartments
);
