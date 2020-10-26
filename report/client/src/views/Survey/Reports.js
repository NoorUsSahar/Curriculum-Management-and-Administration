import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import Spinner from "../../layouts/Spinner";
import {
  getResponseByTitles,
  getResponseBySurveyId,
} from "../../actions/survey.js";
import { getAllDepartments } from "../../actions/department";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Paper from "@material-ui/core/Paper";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import avatar from "../../assets/img/profile.png";

import { Bar, Doughnut } from "react-chartjs-2";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// const useStyles = makeStyles(styles);
const Survey_Reports = ({
  // getResponseByTitles,
  getResponseBySurveyId,
  getAllDepartments,
  match,
  department: { departments },
  survey: { responses, loading },
}) => {
  useEffect(() => {
    // getResponseByTitles();
    getResponseBySurveyId();
    getAllDepartments();
  }, [
    //  getResponseByTitles ,
    getResponseBySurveyId,
    getAllDepartments,
  ]);
  const classes = useStyles();

  var DoughnutchartJsData = function (satisfied, not_satisfied, neutral) {
    return {
      labels: ["Satisfied", "Neutral", "Not Satisfied"],
      datasets: [
        {
          borderWidth: 2,
          data: [satisfied, not_satisfied, neutral],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          // textBaseline : 'middle'
        },
      ],
      options: {
        centerText: {
            display: true,
            text: 'Noor'
        }
      }
    };
  };

  var BarchartJsData = function (satisfied, not_satisfied, neutral) {
    return {
      labels: ["Satisfied", "Neutral", "Not Satisfied"],
      datasets: [
        {
          label: "Satisfied",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [satisfied, 0, 0],
        },
        {
          label: "Neutral",
          backgroundColor: "rgba(2,20,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [0, neutral, 0],
        },
        {
          label: "Not Satisfied",
          backgroundColor: "rgba(75,192,50,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [0, 0, not_satisfied],
        },
      ],
    };
  };

  // getResponseByTitles({ title: title });
  getResponseBySurveyId(match.params.survey_id);
  var count = 0;
  var satis = 0;
  var not_satis = 0;
  var neut = 0;

  var myObj = [];

  var responses_obj = [];
  // setSatisfied_response({satis});
  return (
    <Fragment>
      {loading || responses == null ? (
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
                        <h2 className={classes.cardTitleWhite}>
                          {" "}
                          Survey Reports
                        </h2>
                      </CardHeader>
                      <CardBody>
                        <GridContainer component={Paper}>
                          {match.params.survey_id == "SCEQ" ? (
                            <Card>
                              <CardHeader color='default'>
                                {" "}
                                <h2>Departments</h2>
                              </CardHeader>
                              <CardBody>
                                {departments.length > 0 ? (
                                  departments.map((department) => (
                                    <Card>
                                      <CardHeader color = 'danger'>{department.name}</CardHeader>

                                      {/* {responses.length > 0 ? (
                                        responses.map((response) => {
                                          if (
                                            department.name ==
                                            response.department
                                          ) {
                                            count++;
                                            satis += response.satisfied;
                                            not_satis += response.not_satisfied;
                                            neut += response.neutral;
                                          }

                                          myObj.push({
                                            department: response.department,
                                            course: response.course,
                                            satisfied: satis,
                                            not_satis,
                                            notSatified: not_satis,
                                            neutral: neut,
                                          });
                                        })
                                      ) : (
                                        <p></p>
                                      )} */}
                                      {
                                        <CardBody>
                                          <GridContainer>
                                            {responses.length > 0 ? (
                                              responses.map((response) =>
                                                response.department ==
                                                department.name ? (
                                                  <GridItem
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                  >
                                                    <h2>{response.course}</h2>
                                                    <Doughnut
                                                      data={DoughnutchartJsData(
                                                        response.satisfied,
                                                        response.not_satisfied,
                                                        response.neutral
                                                      )}
                                                      options={{
                                                        responsive: true,
                                                        maintainAspectRatio: true,
                                                      }}
                                                    />
                                                  </GridItem>
                                                ) : (
                                                  <p></p>
                                                )
                                              )
                                            ) : (
                                              <h2>No Courses Found</h2>
                                            )}
                                          </GridContainer>
                                        </CardBody>
                                      }
                                    </Card>
                                  ))
                                ) : (
                                  <h3>No Departments Found</h3>
                                )}
                              </CardBody>
                            </Card>
                          ) : (
                            <p></p>
                          )}

                          {match.params.survey_id == "SGS" ? (
                            <Card>
                              
                              <CardBody>
                                {responses.length > 0 ? (
                                  responses.map((response) => {
                                    count++;
                                    satis += response.satisfied;
                                    not_satis += response.not_satisfied;
                                    neut += response.neutral;
                                  })
                                ) : (
                                  <p></p>
                                )}
                                <div>
                                  <GridContainer>
                                    <GridItem xs={12} sm={6} md={8}>
                                      {(satis, not_satis, neut, count)}
                                      <Bar
                                        data={BarchartJsData(
                                          (satis / count / 28) * 100,
                                          (not_satis / count / 28) * 100,
                                          (neut / count / 14) * 100
                                        )}
                                        options={{
                                          title: {
                                            display: true,
                                            text:
                                              "Survey for Graduating Students",
                                            fontSize: 20,
                                          },
                                          legend: {
                                            display: true,
                                            position: "right",
                                          },
                                        }}
                                      />
                                    </GridItem>
                                  </GridContainer>
                                </div>
                              </CardBody>
                            </Card>
                          ) : (
                            <p></p>
                          )}
                        </GridContainer>
                      </CardBody>
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

Survey_Reports.propTypes = {
  // getResponseByTitles: PropTypes.func.isRequired,
  getAllDepartments: PropTypes.func.isRequired,
  getResponseBySurveyId: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  survey: state.survey,
  department: state.department,
});
export default connect(mapStateToProps, {
  //  getResponseByTitles ,
  getAllDepartments,
  getResponseBySurveyId,
})(Survey_Reports);
