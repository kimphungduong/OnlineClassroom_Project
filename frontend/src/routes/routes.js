import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';
import { TeacherRoute } from '~/auth';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
//import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import Logout from '~/pages/Logout';
import DiscussionForum from '~/pages/Forum';
import AddPost from '~/pages/AddForumPost';
import ForumPostDetail from '~/pages/ForumPostDetail';
import CartPage from '~/pages/CartPage';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import TeacherMessagePage from '~/pages/TeacherMessagePage';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    //{ path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: CoursePage, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.logout, component: Logout, layout: HeaderOnly },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: config.routes.course, component: CoursePage, layout: HeaderOnly },
    { path : config.routes.forum, component: DiscussionForum, layout: HeaderOnly },
    { path : config.routes.addPost, component: AddPost, layout: HeaderOnly },
    { path : config.routes.forumPostDetail, component : ForumPostDetail, layout: HeaderOnly },
    { path: config.routes.cart, component: CartPage, layout: HeaderOnly },
    { path: config.routes.login, component: LoginPage, layout: HeaderOnly },
    { path: config.routes.register, component: RegisterPage, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: HeaderOnly },
    { path : config.routes.message, component : TeacherMessagePage, layout : HeaderOnly, auth: TeacherRoute },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
