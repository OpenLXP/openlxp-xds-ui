import axios from 'axios';
import { useQuery } from 'react-query';
import { oneHour } from '../config/timeConstants';

const getSpotlightCourses = () => {
  return () =>
    axios
      .get('http://localhost:8100/api/spotlight-courses')
      .then((res) => res.data);
};

export default function useSpotlightCourses() {
  return useQuery('spotlight-courses', getSpotlightCourses(), {
    staleTime: oneHour,
  });
}
