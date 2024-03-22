import { axiosInstance } from '@/config/axiosConfig';
import { allRead } from '@/config/endpoints';

export const getAllRead = () => {
  return () => axiosInstance.get(allRead).then((res) => res.data);
};

