import axios from 'axios';
import { moreLikeThisUrl } from '../config/endpoints';
import { useQuery, useQueryClient } from 'react-query';
import { oneHour } from '../config/timeConstants';

const getMoreCoursesLikeThis = (id) => {
  return () => axios.get(`${moreLikeThisUrl}${id}/`).then((res) => res.data);
};

export function useMoreCoursesLikeThis(id) {
  const queryClient = useQueryClient();
  return useQuery(['more-like-this', id], getMoreCoursesLikeThis(id), {
    onSuccess: (data) => {
      data?.hits?.map((course) => {
        queryClient.setQueryData(['course', course.meta.id], course);
        queryClient.setQueryDefaults(['course', course.meta.id], {
          staleTime: oneHour,
          cacheTime: oneHour,
        });
      });
    },
  });
}
