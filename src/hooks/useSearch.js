import { tenMinutes } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const getSearchResults = (searchTerm) => {
  return axios.get(searchTerm).then((res) => res.data);
};

export function useSearch(url) {
  const queryClient = useQueryClient();
  return useQuery(['search', url], () => getSearchResults(url), {
    staleTime: tenMinutes,
    onSuccess: (data) => {
      // add each of the hits to the query client as a course
      // the hit.meta.id is the same as the metadata_key_hash
      data?.hits.forEach((hit) => {
        queryClient.setQueryData(['course', hit.meta.id], hit);
      });
    },
  });
}
