import React, {  useState , useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { createProfile , getCurrentFaculty } from "../../actions/profile";
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



  const EditProfile = ({
    profile: { current_profile, loading },
    createProfile,
    history,
    getCurrentFaculty,
  }) => {
    const [formData, setFormData] = useState({
      phone_number: "",
      designation: "",
      courses_teaching: "",
      bio: "",
      website: "",
      address: "",
    });
    const classes = useStyles();

    useEffect(() => {
        getCurrentFaculty();
    
        setFormData({
          phone_number:
            loading || !current_profile.phone_number ? "" : current_profile.phone_number,
          bio: loading || !current_profile.bio ? "" : current_profile.bio,
          website: loading || !current_profile.website ? "" : current_profile.website,
          designation: loading || !current_profile.designation ? "" : current_profile.designation,
          courses_teaching:
            loading || !current_profile.courses_teaching
              ? ""
              : current_profile.courses_teaching.join(","),
          address: loading || !current_profile.address ? "" : current_profile.address,
          //   twitter : loading || !profile.social ? '' : profile.twitter,
          //   facebook : loading || !profile.social ? '' : profile.facebook,
          //   linkedin : loading || !profile.social ? '' : profile.linkedin,
          //   youtube : loading || !profile.social ? '' : profile.youtube,
          //   instagram : loading || !profile.social ? '' : profile.instagram,
        });
      }, [loading]);
      const {
        phone_number,
        bio,
        website,
        designation,
        courses_teaching,
        address,
      } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history , true);
  };
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h3 className={classes.cardTitleWhite}>
                  Your Profile
                </h3>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <Button
                   color="primary"
                  variant="contained" 
                  round
                  href="/faculty/add-experience"
                  size="medium"
                >
                  Add Experience
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  round
                  href="/faculty/add-research-papers"
                  size="medium"
                >
                  Add Research Papers
                </Button>
                <Button
                  color="primary"
                  round
                  variant="contained"
                  size="medium"
                  href="/faculty/add-education"
                >
                  Add Education
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='designation-label'>Designation</InputLabel>
                    <Select
                      labelId='designation-label'
                      label='Designation'
                      name='designation'
                      value={designation}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='Professor'>
                       Professor
                      </MenuItem>
                      <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                      <MenuItem value="Associate Professor">
                        Associate Professor
                      </MenuItem>
                      <MenuItem value="Lecturer">
                        Lecturer
                      </MenuItem>
                      <MenuItem value="Other">
                        Other
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Phone Number'
                    variant='outlined'
                    type='text'
                    name='phone_number'
                    pattern="[0-9]{11}"
                    value={phone_number}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Website'
                    variant='outlined'
                    type='text'
                    name='website'
                    value={website}
                    onChange={e => onChange(e)}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Address'
                    variant='outlined'
                    type='text'
                    name='address'
                    value={address}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Courses Teaching'
                    variant='outlined'
                    type='text'
                    name='courses_teaching'
                    value={courses_teaching}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
    
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Bio'
                    variant='outlined'
                    type='text'
                    rows={5}
                    multiline
                    name='bio'
                    value={bio}
                    onChange={e => onChange(e)}
                    // required={true}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentFaculty: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
  // profile: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile , getCurrentFaculty })(
  withRouter(EditProfile)
);
