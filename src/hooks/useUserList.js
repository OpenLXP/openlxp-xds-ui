import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { useQuery } from 'react-query';

const getUserList = (id) => {
  if (!id) return null;
  return () => axiosInstance.get(interestLists + id).then((res) => res.data);
};

export function useUserList(id) {
  return useQuery(['user-list', id], getUserList(id), {});
}
