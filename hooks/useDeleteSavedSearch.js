import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const deleteSearch = (id, token) => {
  return axios
    .delete(`http://localhost:8100/api/saved-filters/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);
};

export function useDeleteSavedSearch(token) {
  const queryClient = useQueryClient();

  return useMutation(({ id }) => deleteSearch(id, token), {
    onError: () => console.log('error'),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.invalidateQueries(['saved-search-list']);
    },
  });
}
