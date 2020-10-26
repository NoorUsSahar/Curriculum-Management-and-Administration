import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import Spinner from "../../layouts/Spinner";
import { getAllSurveyForms } from "../../actions/survey.js";
import { loadUser } from "../../actions/auth";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
// import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import Accessibility from "@material-ui/icons/Accessibility";
import avatar from "../../assets/img/profile.png";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// const useStyles = makeStyles(styles);
const Survey_Landing_Admin = ({
  getAllSurveyForms,
  survey: { surveys_all, loading },
  loadUser,
  auth : {user}
}) => {
  useEffect(() => {
    getAllSurveyForms();
    loadUser();
  }, [getAllSurveyForms , loadUser]);
  const classes = useStyles();
  return (
    <Fragment>
      {loading && user.loading ? (
        <div>Looking</div>
      ) : (
        <Fragment>
          <div className="surveys">
            <GridContainer xs={12} sm={12} md={12}>
              <GridItem xs={12} sm={6} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={12}>
                    <Card>
                      <CardHeader color="primary">
                        <h2 className={classes.cardTitleWhite}> Surveys</h2>
                      </CardHeader>
                      <CardBody>
                        {surveys_all.length > 0 ? (
                          surveys_all.map((surveys) => (
                            <GridContainer>
                              <TableContainer component={Paper}>
                                <Table
                                  className={classes.table}
                                  aria-label="customized table"
                                >
                                  <TableBody>
                                    <StyledTableRow>
                                      <StyledTableCell>
                                        {" "}
                                        {surveys.surveys.title}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {
                                          user.type == 0 ? (<Button
                                            color="primary"
                                            round
                                            href={`/admin/survey_form/${surveys._id}`}
                                            size="medium"
                                          >
                                            Add Publish Date 
                                          </Button>) : (<Button>Not admin</Button>)
                                        }
                                        <Button
                                          color="primary"
                                          round
                                          href={`/admin/survey_form/${surveys._id}`}
                                          size="medium"
                                        >
                                          Fill 
                                        </Button>
                                        {/* <Button
                                          color="primary"
                                          round
                                          href={`/`}
                                          size="medium"
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          color="primary"
                                          round
                                          href={`/admin/survey_reports/${surveys.surveys.survey_id}`}
                                          size="medium"
                                        >
                                          Generate Report
                                        </Button> */}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </GridContainer>
                          ))
                        ) : (
                          <h4>No surveys_all Found</h4>
                        )}
                      </CardBody>
                      {/* <CardFooter stats>
                      <Button
                        color="info"
                        round
                        href={`/admin/survey/${surveys._id}`}
                      >
                        View Survey
                      </Button>
                    </CardFooter> */}
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Survey_Landing_Admin.propTypes = {
  getAllSurveyForms: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired,
  loadUser : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  survey: state.survey,
  auth: state.auth,

});
export default connect(mapStateToProps, { getAllSurveyForms })(
  Survey_Landing_Admin
);
