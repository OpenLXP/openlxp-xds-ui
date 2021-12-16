import axios from 'axios';
import { userOwnedLists } from '../config/endpoints';
import { oneMinute } from 'config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';
import { axiosInstance } from 'config/axiosConfig';
const getUserLists = () => {
  return () => axiosInstance.get(userOwnedLists).then((res) => res.data);
};

export function useUserOwnedLists() {
  const queryClient = useQueryClient();
  return useQuery(['user-owned-lists'], getUserLists(), {
    staleTime: oneMinute,
    onSuccess: (data) => {},
  });
}
