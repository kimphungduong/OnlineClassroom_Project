import { logout } from "~/store/slices/authSlice";

const routes = {
    home: '/',
    following: '/following',
    logout: '/logout',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    login: '/login',
    dashboard: '/dashboard',
    course: '/course/:slugCourse/:slugLesson',
    forum : '/forum',
    addPost : '/add-post',
    forumPostDetail : '/forum/id',
};

export default routes;
