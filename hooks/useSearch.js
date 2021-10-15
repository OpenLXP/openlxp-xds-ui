import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { oneHour, tenMinutes } from '../config/timeConstants';

export default function useSearch(url) {
  const queryClient = useQueryClient();
  return useQuery(
    ['search', url],
    () => axios.get(url).then((res) => res.data),
    {
      staleTime: tenMinutes,
      onSuccess: () => {
        const queryData = queryClient.getQueryData(['search', url]);
        queryData?.hits?.map((course) => {
          queryClient.setQueryData(['course', course.meta.id], course);
          queryClient.setQueryDefaults(['course', course.meta.id], {
            staleTime: oneHour,
          });
        });
      },
    }
  );
}
