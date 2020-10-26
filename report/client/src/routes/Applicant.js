import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from '../views/Admin/Dashboard';
import ManageDepartments from '../views/Admin/ManageDepartments';
import ManagePrograms from '../views/Admin/ManagePrograms';
import PersonalDetails from '../views/Applicant/PersonalDetails';
import IncomeDetails from '../views/Applicant/IncomeDetails';
import EducationDetails from '../views/Applicant/EducationDetails';
import Survey from '../views/Survey/Survey_Landing_Admin';
import SurveyIcon from '@material-ui/icons/Description';

const routes = [
  {
    path: '/personal-details',
    name: 'Personal Details',
    icon: DashboardIcon,
    component: PersonalDetails,
    layout: '/applicant',
  },
  {
    path: '/income-details',
    name: 'Income Details',
    icon: DashboardIcon,
    component: IncomeDetails,
    layout: '/applicant',
  },
  {
    path: '/education-details',
    name: 'Education Details',
    icon: DashboardIcon,
    component: EducationDetails,
    layout: '/applicant',
  },
  {
    path: '/survey',
    name: 'Survey',
    icon: SurveyIcon,
    component: Survey,
    layout: '/applicant',
  },
  // {
  //   path: '/manage-departments',
  //   name: 'Manage Departments',
  //   icon: DashboardIcon,
  //   component: ManageDepartments,
  //   layout: '/admin',
  // },
  // {
  //   path: '/manage-programs',
  //   name: 'Manage Programs',
  //   icon: DashboardIcon,
  //   component: ManagePrograms,
  //   layout: '/admin',
  // },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  //   {
  //     path: '/user',
  //     name: 'User Profile',
  //     rtlName: 'ملف تعريفي للمستخدم',
  //     icon: Person,
  //     component: UserProfile,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/table',
  //     name: 'Table List',
  //     rtlName: 'قائمة الجدول',
  //     icon: 'content_paste',
  //     component: TableList,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/typography',
  //     name: 'Typography',
  //     rtlName: 'طباعة',
  //     icon: LibraryBooks,
  //     component: Typography,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/icons',
  //     name: 'Icons',
  //     rtlName: 'الرموز',
  //     icon: BubbleChart,
  //     component: Icons,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/maps',
  //     name: 'Maps',
  //     rtlName: 'خرائط',
  //     icon: LocationOn,
  //     component: Maps,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/notifications',
  //     name: 'Notifications',
  //     rtlName: 'إخطارات',
  //     icon: Notifications,
  //     component: NotificationsPage,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/rtl-page',
  //     name: 'RTL Support',
  //     rtlName: 'پشتیبانی از راست به چپ',
  //     icon: Language,
  //     component: RTLPage,
  //     layout: '/rtl',
  //   },
  //   {
  //     path: '/upgrade-to-pro',
  //     name: 'Upgrade To PRO',
  //     rtlName: 'التطور للاحترافية',
  //     icon: Unarchive,
  //     component: UpgradeToPro,
  //     layout: '/admin',
  //   },
];

export default routes;
