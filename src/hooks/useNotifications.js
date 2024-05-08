import { useQuery, useQueryClient } from 'react-query';

import { axiosInstance } from '@/config/axiosConfig';
import { allNotification } from '@/config/endpoints';

export const getNotifications = () => {
  return () => axiosInstance.get(allNotification).then((res) => res.data);
};

export const useNotifications = () => {
  const queryClient = useQueryClient();
  return useQuery(['notifications-list'], getNotifications(), {
      retry: true,
      staleTime: 10000,
      onSuccess: (data) => {
        // add each of the hits to the query client as a list
        // the hit.id is the same as the interest list id
        data?.all_list.forEach((hit) => {
          queryClient.setQueryData(['notification', hit.id], hit);
        });
      },
  });
    
};

