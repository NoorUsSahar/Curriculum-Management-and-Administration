import React, { Fragment , useEffect} from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
// import Profile from "../../views/UserProfile/Profile.js"
import { getCurrentFaculty } from "../../actions/profile";
import ButtonGroup from "@material-ui/core/ButtonGroup";


import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Person from '@material-ui/icons/Person';
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  Hidden,
  Popper,
  Divider
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import styles from '../../assets/jss/material-dashboard-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);


 
const FacultyNavbarLinks = ({ logout, getCurrentFaculty , profile: {profile} }) => {
   
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  useEffect(() => {
        getCurrentFaculty();
        
      }, [getCurrentFaculty]);
  return (
    <Fragment>
       <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <Link
                      to={'/faculty/create-profile'}
                      className='text-decoration-none'
                    >
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Create Profile
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={logout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {/* <AppBar position="static" style={{ background: "transparent" }}>
        <Toolbar>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button href="/dashboard">Dashboard</Button>
            {/* <Button href={`/profile/${profile.faculty._id}`}>Profile</Button> */}
            {/* <Button
              aria-label="Logout"
            //   className={classes.buttonLink}
              onClick={logout}
              href="/"
            >
              Logout
            </Button>
          </ButtonGroup>
        
        </Toolbar>
      </AppBar> */} 
    </Fragment>
  );
};

FacultyNavbarLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentFaculty: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout, getCurrentFaculty })(
  FacultyNavbarLinks
);
