import { useMutation, useQueryClient } from 'react-query';
import { interestLists } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';

const updateUserList = ({ id, listData }, token) => {
  return axiosInstance
    .patch(interestLists + id, listData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);
};

export function useUpdateUserList(token) {
  const queryClient = useQueryClient();
  return useMutation((values) => updateUserList(values, token), {
    onMutate: () => {},
    onSuccess: (newList) => {
      // refetching the data once a res.ok response is confirmed
      queryClient.refetchQueries(['user-owned-lists'], {});
      queryClient.refetchQueries(['user-list', newList.id], {});
    },
    onError: () => {},
    onSettled: () => {},
  });
}
