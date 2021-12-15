import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { interestLists } from '../config/endpoints';

export function useCreateUserList(token) {
  const queryClient = useQueryClient();
  return useMutation(
    (variables) =>
      axios
        .post(interestLists, variables.form, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => res.data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['user-owned-lists']);
      },
    }
  );
}
