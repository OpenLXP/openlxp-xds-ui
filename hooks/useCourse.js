import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axiosConfig';
import { courseUrl } from '../config/endpoints';
import { oneHour } from '../config/timeConstants';
export function useCourse(courseId) {
  return useQuery(
    ['course', courseId],
    () => axiosInstance.get(courseUrl + courseId).then((res) => res.data),
    { staleTime: oneHour, cacheTime: oneHour }
  );
}
