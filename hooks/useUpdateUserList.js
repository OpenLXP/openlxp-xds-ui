import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { interestLists } from '../config/endpoints';

const updateUserList = ({ id, listData }, token) => {
  return axios
    .patch(interestLists + id, listData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function useUpdateUserList(token) {
  const queryClient = useQueryClient();
  return useMutation((values) => updateUserList(values, token), {
    onMutate: ({ listData, id }) => {
      // Optimistically updating the list
      const old = queryClient.getQueryData(['user-list', id]);
      queryClient.setQueryData(['user-list', id], listData);

      // returning the snapshot of the old data in the event that there is an error.
      return old;
    },
    onSuccess: (newList) => {
      // short circuiting the refetch
      queryClient.setQueryData(['user-list', newList.id], newList.id);
      queryClient.setQueryData(['user-owned-lists'], (old = []) => {
        // if there is a collection of data otherwise undefined
        return old?.map((d) => {
          // replace the old list with the new post we created
          if (d.id === newList.id) {
            return newList;
          }
          return d;
        });
      });
    },
    onError: (value, newValue, oldValue) => {
      console.log(oldValue);
      queryClient.invalidateQueries(
        ['user-list', oldValue.id],
        oldValue.listData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user-owned-lists']);
    },
  });
}
