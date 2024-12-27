import {courseApi} from '~/api';


export const getListCourse = async () => {
    try {
        const response = await courseApi.getListCourse();
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};
export const getMyCourse = async (slug) => {
    try {
        const response = await courseApi.getMyCourse(slug);
        return response.data;
    } catch (error) {
        console.error('Error fetching course with lessons:', error);
        throw error;
    }
};

export const getCourse = async (slug) => {
    try {
        const response = await courseApi.getCourse(slug);
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
};

export const getLesson = async (courseSlug, lessonSlug) => {
    try {
        const response = await courseApi.getLesson(courseSlug, lessonSlug);
        return response.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        throw error;
    }
};

export const addPost = async (courseSlug, data) => {
    try {
        const response = await courseApi.addPost(courseSlug, data);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
}

export const getForumPosts = async (courseSlug) => {
    try {
        const response = await courseApi.getForumPosts(courseSlug);
        if(response.data?.success){
            return response.data.data;
        }

        throw new Error("Có lỗi khi lấy bài viết từ forum");
    } catch (error) {
        console.error('Error fetching forum posts:', error);
        throw error;
    }
};

export async function getForumPostDetail(courseSlug, postId) {
    try {
        const response = await courseApi.getForumPostDetail(courseSlug, postId);

        if(response.data?.success){
            return response.data.data;
        }

        throw new Error("Có lỗi khi lấy bài viết từ forum");
    } catch (error) {
        console.error('Error fetching forum post detail:', error);
        throw error;
    }
}

export async function addComment(courseSlug, postId, data) {
    try {
        const response = await courseApi.addComment(courseSlug, postId, data);
        console.log(response.data);
        if(response.data?.success){
            return response.data.data;
        }

        throw new Error("Có lỗi khi thêm comment");
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

export async function voteComment(courseSlug, postId, commentId, value) {
    try {
        const response = await courseApi.voteComment(courseSlug, postId, commentId, value);
        if(response.data?.success){
            return response.data.data;
        }

        throw new Error("Có lỗi khi vote comment");
    } catch (error) {
        console.error('Error voting comment:', error);
        throw error;
    }
}