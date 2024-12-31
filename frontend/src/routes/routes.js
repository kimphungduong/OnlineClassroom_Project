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
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import CourseEdit from '~/pages/CourseEdit';
import LessonEdit from '~/pages/LessonEdit';
import LessonNew from '~/pages/LessonNew';
import CourseStat from '~/pages/CourseStat';
import MembersStat from '~/pages/MembersStat';
import TestNew from '~/pages/TestNew';
import TestEdit from '~/pages/TestEdit';
import TestPage from '~/pages/TestPage';


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: CoursePage, layout: HeaderOnly, auth: StudentRoute },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.dashboard, component: Dashboard, layout: HeaderOnly },
    { path: config.routes.course, component: CoursePage, layout: HeaderOnly },
    { path: config.routes.courseEdit, component: CourseEdit, layout: HeaderOnly },
    { path: config.routes.lessonEdit, component: LessonEdit, layout: HeaderOnly },
    { path: config.routes.lessonNew, component: LessonNew, layout: HeaderOnly },
    { path: config.routes.courseStat, component: CourseStat, layout: HeaderOnly },
    { path: config.routes.membersStat, component: MembersStat, layout: HeaderOnly },
    { path: config.routes.testNew, component: TestNew, layout: HeaderOnly },
    { path: config.routes.testEdit, component: TestEdit, layout: HeaderOnly },
    { path: config.routes.testPage, component: TestPage, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
