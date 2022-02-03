import { useQuery } from 'react-query';
import { interestLists } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';

const getUserList = (id) => {
  return () => axiosInstance.get(interestLists + id).then((res) => res.data);
};

export function useUserList(id) {
  return useQuery(['user-list', id], getUserList(id), {});
}
