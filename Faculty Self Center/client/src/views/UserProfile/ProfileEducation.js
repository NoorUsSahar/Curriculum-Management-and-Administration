import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {deleteExperience} from '../../actions/profile'

import { connect } from "react-redux";

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProfileEducation = ({ profile : { profile : {education}  }  , deleteEducation}) => {
  const classes = useStyles();
  return (
   

    <div>
         <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Institute</StyledTableCell>
            <StyledTableCell align="right">Degree</StyledTableCell>
            <StyledTableCell align="right">Grade</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {education.map((education , index) => (
            //  <div key={index} education={education}>
            <StyledTableRow key={index}  education={education}>
              <StyledTableCell >
                {education.institute}
              </StyledTableCell>
              <StyledTableCell align="right">{education.degree}</StyledTableCell>
              <StyledTableCell align="right">{education.grade}</StyledTableCell>
              
              <StyledTableCell align="right"><Moment format="YYYY/MM/D">{education.from}</Moment></StyledTableCell>
              <StyledTableCell align="right"> <Moment format="YYYY/MM/D">{education.to}</Moment></StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button
              aria-label="Delete"
              color="primary"
              variant="contained"
            //   className={classes.buttonLink}
              onClick={deleteEducation}
              href={`/profile/education/${education._id}`}
            >
              Delete
            </Button></StyledTableCell> */}
            </StyledTableRow>
            // </div>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  //education : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteExperience  })( ProfileEducation);
