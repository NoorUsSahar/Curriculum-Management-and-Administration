import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { loadAllCoordinators } from '../../actions/coordinator';

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

const ManageCoordinators = ({
  loadAllCoordinators,
  coordinator: { loading, isAuthenticated, coordinators }
}) => {
  const classes = useStyles();

  const [coordinatorList, setCoordinatorList] = useState([]);

  const getCoordinator = () => {
    let res = [];
    let i = 1;

    coordinatorList.forEach(coordinator => {
      res = [
        ...res,
        [
          `${i}`,
          coordinator.name,
          <Fragment>
            <Link
              to={`/admin/update-coordinator/${coordinator._id}`}
              className='text-decoration-none'
            />
            <Button
              color='secondary'
              variant='contained'
              className='margin-left-right margin-top-bottom'
            >
              Update Coordinator
            </Button>
          </Fragment>
        ]
      ];

      i++;
    });
  };

  const [getAllCoordinatorsLoaded, setAllCoordinatorsLoaded] = useState(false);

  useEffect(() => {
    if (!getAllCoordinatorsLoaded) {
      loadAllCoordinators();
      setAllCoordinatorsLoaded(true);
    }

    setCoordinatorList(!loading && coordinators.length > 0 ? coordinators : []);
  }, [coordinators]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h2 className={classes.cardTitleWhite}>Manage Coordinators</h2>
            <p className={classes.cardCategoryWhite}>
              Below is the list of all Coordinators
            </p>
          </CardHeader>
          <CardBody>
            <Link
              to={'/admin/add-coordinator'}
              className='text-decoration-none'
            >
              <Button color='primary' variant='contained'>
                Add Coordinator
              </Button>
            </Link>
            {coordinatorList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={['S.No', 'Name', 'Email', 'Department', 'Actions']}
                tableData={getCoordinator()}
              />
            ) : (
              <div class='text-center imp-message'>No coordinators found</div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ManageCoordinators.propTypes = {
  isAuthenticated: PropTypes.bool,
  loadAllCoordinators: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.coordinator.isAuthenticated,
  coordinator: state.coordinator
});

export default connect(mapStateToProps, { loadAllCoordinators })(
  ManageCoordinators
);
