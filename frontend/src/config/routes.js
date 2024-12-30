const routes = {
    home: '/',
    following: '/following',
    profile: '/@:nickname',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    login: '/login',
    dashboard: '/dashboard',
    course: '/course',
    courseEdit: '/course-edit/:slug',
    lessonEdit: '/lesson-edit/:slug/sections/:sectionId/lesson/:lessonId',
    lessonNew: '/lesson-edit/:slug/sections/:sectionId/lesson/new',
    courseStat: '/course-stat/:slug',
    membersStat: '/members-stat',
    testNew: '/test-edit/:slug/sections/:sectionId/test/new',
    testEdit: '/test-edit/:slug/sections/:sectionId/test/:testId',

};

export default routes;
