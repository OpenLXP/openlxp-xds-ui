import { tenMinutes } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

export function useSearch(url) {
  const queryClient = useQueryClient();
  return useQuery(
    ['search', url],
    () => axios.get(url).then((res) => res.data),
    {
      staleTime: tenMinutes,
    }
  );
}
