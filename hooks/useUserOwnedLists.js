import axios from 'axios';
import { userOwnedLists } from '../config/endpoints';
import { useQuery, useQueryClient } from 'react-query';
const getUserLists = (token) => {
  return () =>
    axios
      .get(userOwnedLists, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data);
};

export default function useUserOwnedLists(token) {
  const queryClient = useQueryClient();
  return useQuery(['user-owned-lists'], getUserLists(token), {
    onSuccess: (data) => {
      data.map((list) => {
        queryClient.setQueryData(['user-list', list.id], list);
      });
    },
  });
}