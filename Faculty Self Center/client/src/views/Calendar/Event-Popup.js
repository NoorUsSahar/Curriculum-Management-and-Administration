import React , {useState} from "react";
import Popup from "reactjs-popup";
import { withRouter} from 'react-router-dom';
// @material-ui/core components
import {  withStyles} from "@material-ui/core/styles";
// core components


import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {createEvent} from '../../actions/event';
import {

  Container,
  Grid,
  Paper,
  TextField,

} from '@material-ui/core';



  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #fafffa 30%, #fafffa 90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      height: 48,
      padding: '0 30px',
      weight  : '20px'
      // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
 

  const CreateEvent = ({createEvent , history}) => {
    const [formData, setFormData] = useState({
      title: "",
      start: "",
        end: ""
    });
  
    //const [displaySocialInputs, toggleSocialInputs] = useState(false);
  
    const {
      title,
      start,
      end
    } = formData;

  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
const onSubmit = (e) => {
  e.preventDefault();
  createEvent(formData, history);
};

  

return(
    
  <Popup style={{width:'250px'}} trigger={<StyledButton  > Add Event</StyledButton>} position="right center">

<Container className='container-primary' color ="primary">
        <Paper elevation={4} className='paper-primary'>
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className='text-center-horizontal'
            >
              {/* <Typography
                align='center'
                className='title-secondary'
                color='primary'
              >
                Add Event
              </Typography> */}
              <div className='title-secondary text-center'>
                Add an event
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <TextField
                  className='form-control'
                  label='Title'
                  variant='outlined'
                  type='text'
                  name='title'
                  value={title}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                Start Date
                <TextField
                  className='form-control'
                  variant='outlined'
                  type='datetime-local'
                  name='start'
                  value={start}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                 End Date
                <TextField
                  className='form-control'
                  variant='outlined'
                  type='datetime-local'
                  name='end'
                  value={end}
                  onChange={(e) => onChange(e)}
                  required={true}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  className='form-control'
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>

   {/* <GridContainer>
       <GridItem xs={12} sm={12} md={12}>
    <Card>
        <CardHeader color="primary">
            Add your event
        </CardHeader>
        <form className="form" 
         onSubmit={(e) => onSubmit(e)}
        >
        <CardBody>
        <GridItem xs={12} sm={12} md={12}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                   value={title}
                   onChange={(e) => onChange(e)}
                  />
                </div>            
                </GridItem >
        <GridItem xs={12} sm={12} md={12}>

                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="start"
                   value={start}
                   onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Start 
                  </small>
                </div>
                </GridItem>
                
                <GridItem xs={12} sm={12} md={12}>

                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="end"
                    value={end}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    End 
                  </small>
                </div>
                </GridItem>
               
        </CardBody>
        <CardFooter>
        <GridItem xs={12} sm={12} md={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  <Button color="primary" type="button" href="/edit-profile">
                    Go Back
                  </Button>
                </GridItem>
        </CardFooter>
        </form>
    </Card>
    </GridItem>
   </GridContainer> */}
  </Popup>
)};
CreateEvent.propTypes = {
    createEvent : PropTypes.func.isRequired
};


export default connect(null , {createEvent})(withRouter(CreateEvent));