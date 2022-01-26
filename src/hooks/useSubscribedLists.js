import { axiosInstance } from '@/config/axiosConfig';
import { useQuery } from 'react-query';
import { interestLists } from '@/config/endpoints';

export function useSubscribedLists() {
  return useQuery('subscribedLists', () =>
    axiosInstance.get(interestLists + 'subscriptions').then((res) => res.data)
  );
}
