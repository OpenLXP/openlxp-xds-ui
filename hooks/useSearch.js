import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { oneHour, tenMinutes } from '../config/timeConstants';

export function useSearch(url) {
  const queryClient = useQueryClient();
  return useQuery(
    ['search', url],
    () => axios.get(url).then((res) => res.data),
    {
      staleTime: tenMinutes,
      onSuccess: (data) => {
        data?.hits.map((course) => {
          queryClient.setQueryData(['course', course.meta.id], {
            ...course,
            meta: { metadata_key_hash: course.meta.id },
          });
          queryClient.setQueryDefaults(['course', course.meta.id], {
            staleTime: oneHour,
            cacheTime: oneHour,
          });
        });
      },
    }
  );
}
