import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { saveSearchUrl } from '../config/endpoints';

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

  return useMutation((value) => deleteSearch(value.id, token), {
    onMutate: (value) => {
      const data = queryClient.getQueryData(['saved-search-list']);
      const newData = data.filter((el) => el.id !== value.id);
      queryClient.setQueryData(['saved-search-list'], newData);
    },
    onError: () => console.log('error'),
    onSuccess: () => {
      // queryClient.refetchQueries(['saved-search-list']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['saved-search-list'])
    }
  });
}
