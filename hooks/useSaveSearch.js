import { useQuery } from 'react-query';

import axios from 'axios';
import { saveSearchOwnedUrl } from '../config/endpoints';

const getSavedSearch = (token) => {
  return () =>
    axios
      .get(saveSearchOwnedUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data);
};

export const useSaveSearchList = (url, token) => {
  return useQuery(['saved-search-list'], getSavedSearch(token));
};
