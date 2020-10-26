import React, {  useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
// import { getAllDepartments } from '../../actions/department';
// import { setAlert } from '../../actions/alert';
import { addEducation } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    fontSize: "1.3rem",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const AddEducation = ({ addEducation, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    from: "",
    to: "",
    grade: "",
  });

  const { institute, degree, from, to, grade } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Add Education</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to add an Education
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className="form-control"
                    label="Institute"
                    variant="outlined"
                    type="text"
                    name="institute"
                    value={institute}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className="form-control"
                    label="Degree"
                    variant="outlined"
                    type="text"
                    name="degree"
                    value={degree}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                    
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant="outlined" className="form-control">
                    <InputLabel id="cod-label">Grade</InputLabel>
                    <Select
                      labelId="grade-label"
                      label="Grade"
                      name="grade"
                      value={grade}
                      onChange={(e) => onChange(e)}
                    >
                      <MenuItem value="">
                        <em>Select Your Grade</em>
                      </MenuItem>
                      <MenuItem value="A1">A+</MenuItem>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="A2">A-</MenuItem>
                      <MenuItem value="B1">B+</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="B2">B-</MenuItem>
                      <MenuItem value="C1">C+</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="C2">C-</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  From Date
                  <TextField
                    className="form-control"
                    variant="outlined"
                    type="date"
                    name="from"
                    value={from}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  To Date
                  <TextField
                    className="form-control"
                    variant="outlined"
                    type="date"
                    name="to"
                    value={to}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
});

export default connect(mapStateToProps, {
  addEducation,
})(withRouter(AddEducation));
