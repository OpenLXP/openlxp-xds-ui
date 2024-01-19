import { axiosInstance } from '@/config/axiosConfig';
import { searchUrl } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useQuery } from 'react-query';

export function getDerivedCourses(id) {
  if (!id) return null;
  return axiosInstance.get(searchUrl + 'derived-from/?reference=' + id).then((res) => res.data);
}

export function useDerivedCourse(courseId) {
  return useQuery(['course', courseId], () => getDerivedCourses(courseId), {
    staleTime: oneHour,
    cacheTime: oneHour,

    // keeps the data upto date with what is in the xis
    refetchOnMount: true,
  });
}
