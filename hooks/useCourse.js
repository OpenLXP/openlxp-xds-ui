import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { courseUrl } from '../config/endpoints';
import { oneHour } from '../config/timeConstants';
export default function useCourse(courseId) {
  return useQuery(
    ['course', courseId],
    () => axios.get(courseUrl + courseId).then((res) => res.data),
    { staleTime: oneHour, cacheTime: oneHour }
  );
}
