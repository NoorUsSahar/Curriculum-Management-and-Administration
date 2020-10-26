import React   from "react";
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
import {deleteResearchPaper} from '../../actions/profile';
import { getFacultyById } from "../../actions/profile";
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

const ProfileResearchPapers = ({ profile: { profile : {research_papers } } , 
  deleteResearchPaper , getFacultyById , auth , match , ...rest}) => {
  const classes = useStyles();

  // useEffect(() => {
  //   getFacultyById(match.params.id);
  // }, [getFacultyById, match.params.id]);


  return (
    <div>
      {/* {match.params.id} */}
       <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Authors</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {research_papers.map((research_papers , index) => (
            //  <div key={index} research_papers={research_papers}>
            <StyledTableRow key={index}  research_papers={research_papers}>
              <StyledTableCell >
                {research_papers.title}
              </StyledTableCell>
              <StyledTableCell align="right">{research_papers.description}</StyledTableCell>
              <StyledTableCell align="right"> {research_papers.author}</StyledTableCell>

              <StyledTableCell align="right"><Moment format="YYYY/MM/D">{research_papers.date}</Moment></StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button
                color="primary"
              aria-label="Delete"
              variant="contained"
            //   className={classes.buttonLink}
             onClick={deleteResearchPaper}
              href={`/profile/research_papers/${research_papers._id}`}
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

ProfileResearchPapers.propTypes = {
  profile: PropTypes.object.isRequired,
  getFacultyById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteResearchPaper , getFacultyById })( ProfileResearchPapers);

