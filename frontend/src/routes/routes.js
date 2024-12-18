import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import AllCourse from '~/pages/AllCourse';
import Detail from '~/pages/Detail';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: CoursePage, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: HeaderOnly },
    { path: config.routes.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: config.routes.course, component: CoursePage, layout: HeaderOnly },
    { path: config.routes.allCourse, component: AllCourse, layout: HeaderOnly },
    { path: config.routes.detail, component: Detail, layout: HeaderOnly },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
