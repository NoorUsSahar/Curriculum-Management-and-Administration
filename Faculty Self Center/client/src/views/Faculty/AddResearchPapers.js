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
import { addResearchPapers } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import {
  TextField,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
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

const AddResearchPapers = ({ addResearchPapers, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    author: "",
    description: "",
  });

  const { title, date, author, description } = formData;
  

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addResearchPapers(formData, history);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Add Research Papers</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to add a Research Paper
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className="form-control"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className="form-control"
                    
                    variant="outlined"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className="form-control"
                    label="Authors"
                    variant="outlined"
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => onChange(e)}
                    required={true}
                  />
                    <small className="form-text">
                      Please use comma separated values (eg. Name1 , Name2)
                    </small>
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
                    onChange={e => onChange(e)}
                    // required={true}
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

AddResearchPapers.propTypes = {
  addResearchPapers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    addResearchPapers: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  addResearchPapers,
})(withRouter(AddResearchPapers));
