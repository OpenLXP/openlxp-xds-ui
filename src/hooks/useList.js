import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { useQuery } from 'react-query';

export function getList(id) {
  if (!id) return null;
  return axiosInstance.get(interestLists + id).then((res) => res.data);
}

export function useList(id) {
  return useQuery(['list', id], () => getList(id));
}
