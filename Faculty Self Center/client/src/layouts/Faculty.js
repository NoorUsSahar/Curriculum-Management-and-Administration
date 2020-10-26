import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Admin";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Admin";
import Alert from "../components/Alert/Alert";
import AddResearchPapers from "../views/Faculty/AddResearchPapers.js";
import AddEducation from "../views/Faculty/AddEducation";
import AddExperience from "../views/Faculty/AddExperience";
import CreateProfile from "../views/Faculty/CreateProfile";
import EditProfile from "../views/Faculty/EditProfile";
import Calendar from "../views/Calendar/Calendar";
import Profile from "../views/UserProfile/UserProfile";
import Survey from "../views/Survey/Survey";
import routes from "../routes/Faculty";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/faculty") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    {/* <Route path='/faculty/create-department' component={CreateDepartment} /> */}
    <Route exact path="/faculty/profile/:id" component={Profile}></Route>

    <Route
      exact
      path="/faculty/create-profile"
      component={CreateProfile}
    ></Route>
    <Route exact path="/faculty/edit-profile" component={EditProfile}></Route>
    <Route
      exact
      path="/faculty/add-research-papers"
      component={AddResearchPapers}
    ></Route>
    <Route exact path="/faculty/add-education" component={AddEducation}></Route>
    <Route
      exact
      path="/faculty/add-experience"
      component={AddExperience}
    ></Route>
    <Route exact path="/faculty/calendar" component={Calendar}></Route>
    <Route path="/faculty/survey_form/:id" component={Survey} />

    <Redirect from="/faculty" to="/faculty/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

const Faculty = ({ ...rest }) => {
  const classes = useStyles();

  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Faculty Portal"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <Alert />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Faculty;
