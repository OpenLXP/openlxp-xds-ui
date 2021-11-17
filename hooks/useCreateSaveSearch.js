import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { saveSearchUrl } from '../config/endpoints';

const createSavedSearch = ({ path, name }, token) => {
  return axios
    .post(
      saveSearchUrl,
      { query: path, name: name },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export function useCreateSaveSearch(token) {
  const queryClient = useQueryClient();

  return useMutation((value) => createSavedSearch(value, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-search', value.path]);
      queryClient.refetchQueries(['saved-search', value.path]);
    },
  });
}
