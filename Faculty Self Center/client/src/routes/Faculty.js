import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
 import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
import ProfilesIcon from '@material-ui/icons/SupervisorAccountRounded';
import EditProfileIcon from '@material-ui/icons/PersonOutline';
import SurveyIcon from '@material-ui/icons/Description';
import Survey from '../views/Survey/Survey_Landing_Admin';
 import Dashboard from '../views/Dashboard/Dashboard';
//  import Faculty from '../layouts/Dashboard'
import Profiles from '../views/Profiles/Profiles';
 import EditProfile from '../views/Faculty/EditProfile'
// import EditProfile from '../layouts/EditProfile'
import Calendar from '../views/Calendar/Calendar';
import UserProfile from '../views/UserProfile/UserProfile';


const routes = [
  {
   path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    
    href : '/dashboard',
    layout: '/faculty',
  },
  // {
  //   path: '/edit-profile',
  //   name: 'Edit Profile',
  //   icon: EditProfileIcon,
  //   component: EditProfile,
  //   // href : 'google.com',
  //   layout: '/faculty',
  // },
    //   {
    //   path: '/profile/:id',
    //   name: 'User Profile',
    //   // rtlName: 'ملف تعريفي للمستخدم',
    //   icon: Person,
    //   component: UserProfile,
    //   layout: '/faculty',
    // },
  {
    path: '/profiles',
    name: 'Faculty Profiles',
    icon: ProfilesIcon,
component: Profiles,
    
    layout: '/faculty',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: CalendarTodayIcon,
    component: Calendar,
  href : '/calendar',
    layout: '/faculty',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/faculty',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    // component: NotificationsPage,
    layout: '/faculty',
  },
  {
    path: '/survey',
    name: 'Survey',
    icon: SurveyIcon,
    component: Survey,
    layout: '/faculty',
  },

];

export default routes;
