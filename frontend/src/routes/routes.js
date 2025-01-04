import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';
import { TeacherRoute } from '~/auth';

// Layouts
import { HeaderOnly } from '~/layouts';
import { HeaderTabs } from '~/layouts';
//import { FooterOnly } from '~/layouts';
import FooterOnly from '../layouts/FooterOnly';


// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
//import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import Detail from '~/pages/Detail';
import CoursesOfOneSubject from '~/pages/CoursesOfOneSubject';
import Logout from '~/pages/Logout';
import CartPage from '~/pages/CartPage';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import PaymentPage from '~/pages/PaymentPage';
import DefaultLayout from '~/layouts';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderTabs },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    //{ path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: CoursePage, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.logout, component: Logout, layout: HeaderOnly },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.search, component: Search, layout: HeaderOnly },
    { path: config.routes.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: config.routes.course, component: CoursePage, layout: HeaderOnly },
    { path: config.routes.detail, component: Detail, layout: HeaderOnly },
    { path: config.routes.subject, component: CoursesOfOneSubject, layout: HeaderTabs }, 
    { path: config.routes.cart, component: CartPage, layout: HeaderOnly},
    { path: config.routes.login, component: LoginPage, layout: HeaderOnly },
    { path: config.routes.register, component: RegisterPage, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: HeaderOnly },
    { path: config.routes.payment, component: PaymentPage, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
