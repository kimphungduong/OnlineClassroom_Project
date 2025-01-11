import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';
import { TeacherRoute } from '~/auth';

// Layouts

//import { FooterOnly } from '~/layouts';
import FooterOnly from '../layouts/FooterOnly';

import { HeaderTabs } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
//import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CoursePage from '~/pages/CoursePage';
import Detail from '~/pages/Detail';
import CoursesOfOneSubject from '~/pages/CoursesOfOneSubject';

import TeacherCourse from '~/pages/TeacherCourse';
import CourseNew from '~/pages/CourseNew';
import EditCourseInfo from '~/pages/EditCourseInfo';

import CourseEdit from '~/pages/CourseEdit';
import LessonEdit from '~/pages/LessonEdit';
import LessonNew from '~/pages/LessonNew';
import CourseStat from '~/pages/CourseStat';
import MembersStat from '~/pages/MembersStat';
import StudentStat from '~/pages/StudentStat';
import TestNew from '~/pages/TestNew';
import TestEdit from '~/pages/TestEdit';
import TestPage from '~/pages/TestPage';

import Logout from '~/pages/Logout';
import DiscussionForum from '~/pages/Forum';
import AddPost from '~/pages/AddForumPost';
import ForumPostDetail from '~/pages/ForumPostDetail';
import CartPage from '~/pages/CartPage';
import Login from '~/pages/Login';
import RegisterPage from '~/pages/RegisterPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import TeacherMessagePage from '~/pages/TeacherMessagePage';
import NotificationPage from '~/pages/NotificationPage';
import PaymentPage from '~/pages/PaymentPage';
import { DefaultLayout, HeaderOnly } from '~/layouts';
import VerifyPage from '~/pages/VerifyPage';
import ResetPasswordPage from '~/pages/ResetPassword';
import LoginPage from '~/pages/Login';
import NoneLayout from '~/layouts/NoneLayout'


//import Footer from '~/layouts/components/Footer';


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderTabs, auth: StudentRoute },
    //{ path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.courseLearn, component: CoursePage, layout: DefaultLayout, auth: StudentRoute },
    { path: config.routes.logout, component: Logout, layout: DefaultLayout },
    { path: config.routes.myCourse, component: MyCourse, layout: DefaultLayout, auth: StudentRoute },
    { path: config.routes.search, component: Search, layout: DefaultLayout },
    { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
    { path : config.routes.forum, component: DiscussionForum, layout: DefaultLayout },
    { path : config.routes.addPost, component: AddPost, layout: DefaultLayout },
    { path : config.routes.forumPostDetail, component : ForumPostDetail, layout: DefaultLayout },

    { path: config.routes.course, component: CoursePage, layout: DefaultLayout, auth: StudentRoute },
    { path: config.routes.cart, component: CartPage, layout: DefaultLayout, auth: StudentRoute},
    { path: config.routes.login, component: LoginPage, layout: NoneLayout },

    { path: config.routes.teacherCourse, component: TeacherCourse, layout: DefaultLayout, auth: TeacherRoute },
    { path: config.routes.courseNew, component: CourseNew, layout: DefaultLayout, auth: TeacherRoute },
    { path: config.routes.editCourseInfo, component: EditCourseInfo, layout: DefaultLayout, auth: TeacherRoute },
    { path: config.routes.courseEdit, component: CourseEdit, layout: DefaultLayout, auth: TeacherRoute },

    { path: config.routes.lessonEdit, component: LessonEdit, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.lessonNew, component: LessonNew, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.courseStat, component: CourseStat, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.membersStat, component: MembersStat, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.studentStat, component: StudentStat, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.testNew, component: TestNew, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.testEdit, component: TestEdit, layout: HeaderOnly, auth: TeacherRoute },
    { path: config.routes.testPage, component: TestPage, layout: HeaderOnly, auth: StudentRoute },

    { path: config.routes.register, component: RegisterPage, layout: NoneLayout },
    { path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: DefaultLayout },
    { path : config.routes.message, component : TeacherMessagePage, layout : HeaderOnly },
    { path : config.routes.notification, component : NotificationPage, layout : DefaultLayout },
    { path: config.routes.payment, component: PaymentPage, layout: DefaultLayout, auth: StudentRoute },
    { path: config.routes.verify, component: VerifyPage, layout: DefaultLayout },
    { path: config.routes.resetPassword, component: ResetPasswordPage, layout: DefaultLayout },
    { path: config.routes.detail, component: Detail, layout: DefaultLayout },
    { path: config.routes.subject, component: CoursesOfOneSubject, layout: HeaderTabs, auth: StudentRoute }, 
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
