import { useQuery } from 'react-query';
import { interestLists } from '../config/endpoints';
import { axiosInstance } from 'config/axiosConfig';

export function useList(id) {
  return useQuery(['list', id], () =>
    axiosInstance.get(interestLists + id).then((res) => res.data)
  );
}
