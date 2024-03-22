import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/config/axiosConfig';
import { allNotification } from '@/config/endpoints';

export const getNotifications = () => {
  return () => axiosInstance.get(allNotification).then((res) => res.data);
};

export const useNotifications = (token) => {
    return useQuery(['notifications-list'], getNotifications(), {
        retry: false,
    });
    // const [url, setNewUrl] = useState(makePath(router?.query));

    // useEffect(() => {
    //     let isMounted = true;
    //     if (!isMounted) return;
    //     useNotifications.refetch();
    //     return () => {
    //       isMounted = false;
    //     };
    // }, []);

    

    // return {

    // }
};

