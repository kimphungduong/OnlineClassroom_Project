import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';
import { TeacherRoute } from '~/auth';

// Layouts
import { HeaderOnly } from '~/layouts';
import { HeaderTabs } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import Detail from '~/pages/Detail';
import CoursesOfOneSubject from '~/pages/CoursesOfOneSubject';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderTabs },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: CoursePage, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.search, component: Search, layout: HeaderOnly },
    { path: config.routes.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: config.routes.course, component: CoursePage, layout: HeaderOnly },
    { path: config.routes.detail, component: Detail, layout: HeaderOnly },
    { path: config.routes.subject, component: CoursesOfOneSubject, layout: HeaderTabs }, 
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
