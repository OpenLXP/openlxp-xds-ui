import axios from 'axios';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { searchUrl } from '../config/endpoints';
import { fiveMinutes, tenMinutes } from '../config/timeConstants';

export function useSearch(url) {
  return useQuery(
    ['search', url],
    () => axios.get(url).then((res) => res.data),
    { staleTime: tenMinutes }
  );
}
