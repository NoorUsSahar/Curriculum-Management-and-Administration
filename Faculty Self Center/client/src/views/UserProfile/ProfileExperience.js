import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
// import GridItem from "../../components/Grid/GridItem";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {deleteExperience} from '../../actions/profile'
// import { getFacultyById } from "../../actions/profile";
import { connect } from "react-redux";
// import { Button } from "@material-ui/core";
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
const ProfileExperience = ({profile : { profile : {experience}  } , deleteExperience}) => {
  const classes = useStyles();

  return (
    
    <div>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Designation</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {experience.map((experience , index) => (
            //  <div key={index} experience={experience}>
            <StyledTableRow key={index}  experience={experience}>
              <StyledTableCell >
                {experience.company}
              </StyledTableCell>
              <StyledTableCell align="right">{experience.designation}</StyledTableCell>
              <StyledTableCell align="right"><Moment format="YYYY/MM/D">{experience.from}</Moment></StyledTableCell>
              <StyledTableCell align="right"> <Moment format="YYYY/MM/D">{experience.to}</Moment></StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button
                color="primary"
              aria-label="Delete"
              variant="contained"
            //   className={classes.buttonLink}
             onClick={deleteExperience}
              href={`/profile/experience/${experience._id}`}
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

ProfileExperience.propTypes = {
  // deleteExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  // getFacultyById: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  //experience : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteExperience  })( ProfileExperience);
// export default ProfileExperience;
