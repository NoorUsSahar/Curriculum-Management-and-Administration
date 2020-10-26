import React, {  useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
// import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {getCurrentEvents} from '../../actions/event';
import "../../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event_Popup from "./Event-Popup";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CardHeader from "../../components/Card/CardHeader";
// import { Button } from "@material-ui/core";
const localizer = momentLocalizer(moment);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
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
    fontSize: "2.3rem",
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
const EventCalendar = ({ event : { event }, getCurrentEvents }) => {
  useEffect(() => {
    getCurrentEvents();
  }, [getCurrentEvents]);
 let myEventList = []
 if (event != null){
   
  myEventList = event.event
 }
//  const StyledButton = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #fafffa 30%, #fafffa 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'black',
//     height: 48,
//     padding: '0 30px',
//     // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);

 const classes = useStyles();
  return(
    <div className="App">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary" >
            
            <GridItem xs={12} sm={12} md={9}>
            <h1 className={classes.cardTitleWhite}>Calendar</h1>
         
                  <Event_Popup></Event_Popup>
               
              </GridItem>
               
            
            
              
          </CardHeader>
           
              <CardBody>
              <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
           events={myEventList}
      
          style={{ height: "100vh" }}
        />
        
              </CardBody>
            </Card>
          
            </GridItem>
        </GridContainer>
       
       
      </div>
  );
}

EventCalendar.propTypes = {
  getCurrentEvents : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event,
  // auth: state.auth,

});

export default connect(mapStateToProps , {getCurrentEvents})(EventCalendar);