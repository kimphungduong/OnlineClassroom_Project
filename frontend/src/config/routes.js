import { logout } from "~/store/slices/authSlice";

const routes = {
    home: '/',
    following: '/following',
    logout: '/logout',
    watch: '/watch',
    search: '/search',
    myCourse: '/my-course',
    dashboard: '/dashboard',
    course: '/course/:slugCourse/:slugLesson',
    forum : '/forum',
    addPost : '/add-post',
    forumPostDetail : '/forum/id',
    cart: '/cart',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
};

export default routes;
