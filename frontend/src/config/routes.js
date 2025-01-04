import { logout } from "~/store/slices/authSlice";

const routes = {
    home: '/',
    following: '/following',
    logout: '/logout',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    dashboard: '/dashboard',

    teacherCourse: '/teacher-course',
    courseNew: '/course-new/',
    editCourseInfo: '/course-info/:slug/edit',

    courseEdit: '/course-edit/:slug',
    lessonEdit: '/lesson-edit/:slug/sections/:sectionId/lesson/:lessonId',
    lessonNew: '/lesson-edit/:slug/sections/:sectionId/lesson/new',
    courseStat: '/course-stat/:slug',
    membersStat: '/members-stat/:slug',
    testNew: '/test-edit/:slug/sections/:sectionId/test/new',
    testEdit: '/test-edit/:slug/sections/:sectionId/test/:testId',
    testPage: '/test-take',

    course: '/course/:slugCourse/:slugLesson',
    cart: '/cart',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
};

export default routes;
