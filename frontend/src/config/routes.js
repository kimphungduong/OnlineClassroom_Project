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
    forum : '/course/:slugCourse/forum',
    addPost : '/course/:slugCourse/forum/add-post',
    addComment : "course/:slugCourse/forum/:postId/add-comment",
    forumPostDetail : '/course/:slugCourse/forum/:postId',
    cart: '/cart',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
    message : '/message',
    notification : '/notification',
};

export default routes;
