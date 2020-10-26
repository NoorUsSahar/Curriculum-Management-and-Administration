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
import { getAllDepartments } from '../../actions/department';
import { setAlert } from '../../actions/alert';
import { updateProgram, getProgramById } from '../../actions/program';
import { withRouter } from 'react-router-dom';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

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

const UpdateProgram = ({
  getAllDepartments,
  history,
  department: { loading, departments },
  setAlert,
  updateProgram,
  getProgramById,
  program: { loading: programLoading, program },
  match,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    yearly: '',
    semester: '',
    feePerSemester: '',
    minPercentageOfEquivalence: '',
    categoryOfDegree: '',
    department: '',
  });

  const {
    name,
    description,
    yearly,
    semester,
    feePerSemester,
    minPercentageOfEquivalence,
    categoryOfDegree,
    department,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (categoryOfDegree === '' || department === '') {
      setAlert('Please fill all the fields');
    } else {
      updateProgram(match.params.id, formData, history);
    }
  };

  const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);
  const [getProgramByIdCalled, setGetProgramByIdCalled] = useState(false);

  useEffect(() => {
    if (!getAllDepartmentsCalled) {
      getAllDepartments();
      setGetAllDepartmentsCalled(true);
    }

    if (!getProgramByIdCalled) {
      getProgramById(match.params.id);
      setGetProgramByIdCalled(true);
    }

    setFormData({
      name: !programLoading && program !== null ? program.name : '',
      description:
        !programLoading && program !== null ? program.description : '',
      yearly:
        !programLoading && program !== null ? program.duration.yearly : '',
      semester:
        !programLoading && program !== null ? program.duration.semester : '',
      feePerSemester:
        !programLoading && program !== null ? program.feePerSemester : '',
      minPercentageOfEquivalence:
        !programLoading && program !== null
          ? program.criteria.minPercentageOfEquivalence
          : '',
      categoryOfDegree:
        !programLoading && program !== null
          ? program.criteria.categoryOfDegree
          : '',
      department: !programLoading && program !== null ? program.department : '',
    });
  }, [program]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Create Program</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to create a program
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Yearly duration'
                    variant='outlined'
                    type='number'
                    name='yearly'
                    value={yearly}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Semester duration'
                    variant='outlined'
                    type='number'
                    name='semester'
                    value={semester}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Fee per semester (Rs.)'
                    variant='outlined'
                    type='number'
                    name='feePerSemester'
                    value={feePerSemester}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Minimum percentage of equivalence'
                    variant='outlined'
                    type='number'
                    name='minPercentageOfEquivalence'
                    value={minPercentageOfEquivalence}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='cod-label'>Category of degree</InputLabel>
                    <Select
                      labelId='cod-label'
                      label='Category of degree'
                      name='categoryOfDegree'
                      value={categoryOfDegree}
                      onChange={(e) => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>
                        Intermediate with Mathematics
                      </MenuItem>
                      <MenuItem value={1}>Intermediate with Biology</MenuItem>
                      <MenuItem value={2}>
                        Intermediate with any subject
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='department-label'>Department</InputLabel>
                    <Select
                      labelId='department-label'
                      label='Department'
                      name='department'
                      value={department}
                      onChange={(e) => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!loading &&
                        departments.length > 0 &&
                        departments.map((department) => (
                          <MenuItem value={`${department._id}`}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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

UpdateProgram.propTypes = {
  getAllDepartments: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateProgram: PropTypes.func.isRequired,
  getProgramById: PropTypes.func.isRequired,
  program: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  program: state.program,
});

export default connect(mapStateToProps, {
  getAllDepartments,
  setAlert,
  updateProgram,
  getProgramById,
})(withRouter(UpdateProgram));
