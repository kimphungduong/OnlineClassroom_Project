import {notificationApi} from '~/api';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export const getAllNotification = async () => {
    try {
        const response = await notificationApi.getAllNotification();
        if(response.data?.success === false){
            throw new Error("Có lỗi khi vote post");
        }
        const data = response.data.data;
        console.log(data)
        return data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => {
                    if(item.type === "commentForum") {
                        const createdAt = formatDistanceToNow(parseISO(item.createdAt), { addSuffix: true, locale: vi });
                        return {
                            ...item,
                            link : `/course/${item.related_data.course_slug}/forum/${item.related_data.post_id}`,
                            createdAt : createdAt
                        }
                    }

                    return item;
                });
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
}

export const setRead = async (notificationId) => {
    try {
        const response = await notificationApi.setRead(notificationId);
        if(response.data?.success === false){
            throw new Error("Có lỗi khi set read");
        }
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
}

