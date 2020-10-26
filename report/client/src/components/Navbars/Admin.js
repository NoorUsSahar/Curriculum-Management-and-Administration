import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import AdminNavbarLinks from './AdminNavbarLinks.js';
import Button from '../CustomButtons/Button.js';
import { AppBar, Toolbar, IconButton, Hidden } from '@material-ui/core';

import styles from '../../assets/jss/material-dashboard-react/components/headerStyle.js';

const useStyles = makeStyles(styles);

const Admin = (props) => {
  const classes = useStyles();

  function makeBrand() {
    var name;
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }

  const { color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color='transparent' href='#' className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Admin.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Admin;
