import React, { useState , useEffect} from "react";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSurveyById , setSurveyDates} from "../../actions/survey";
import { Container, Grid, Paper, TextField } from "@material-ui/core";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #fafffa 30%, #fafffa 90%)",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    weight: "20px",
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const PublishDate = ( {survey , getSurveyById , survey_id , setSurveyDates}
) => {

   
  useEffect(() => {
        getSurveyById(survey_id)
        
        }, [getSurveyById , setSurveyDates]);
    
  const [formData, setFormData] = useState({
    publish_date: "",
    end_date : "",
    id:""
  });

  const { publish_date  , end_date , id } = formData;
 
  const onChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, id : survey_id})
    setSurveyDates(formData)
    //   createEvent(formData, history);
  };


  return (
    <Popup
      style={{ width: "100px" }}
      trigger={<Button 
       >Set Dates</Button>}
      position="right center"
    >
      <Container className="container-primary" color="primary">
        <Paper elevation={2} className="paper-primary">
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className="text-center-horizontal"
            >
            <h3>Dates</h3>             
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                Publish Date
                <TextField
                  className="form-control"
                  variant="outlined"
                  type="datetime-local"
                  name="publish_date"
                  value={publish_date}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                End Date
                <TextField
                  className="form-control"
                  variant="outlined"
                  type="datetime-local"
                  name="end_date"
                  value={end_date}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className="form-control"
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Popup>
  );
};
PublishDate.propTypes = {
    getSurveyById : PropTypes.func.isRequired,
    survey_id: PropTypes.string.isRequired,
    survey: PropTypes.object.isRequired,
    setSurveyDates : PropTypes.func.isRequired
  // createEvent : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    survey: state.survey,
    // addSurveyResponse: PropTypes.func.isRequired,
  });


  export default connect(mapStateToProps, {
    getSurveyById,setSurveyDates
  })(withRouter(PublishDate));