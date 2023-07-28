import { axiosInstance } from '@/config/axiosConfig';
import { searchUrl } from '@/config/endpoints';


export function getDerivedCourses(id) {
  if (!id) return null;
  return axiosInstance.get(searchUrl + 'derived-from/?reference=' + id).then((res) => res.data);
}
