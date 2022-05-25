import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { useQuery } from 'react-query';

const getUserList = (id, setCurrentListInfo) => {
  if (!id) return null;
  return () => axiosInstance.get(interestLists + id).then((res) => {
    setCurrentListInfo({
      name: res.data?.name,
      description: res.data?.description,
      experiences: res.data?.experiences,
      public: res.data?.public,
    })
  }
  );
};

export function useUserList(id, setCurrentListInfo) {
  return useQuery(['user-list', id], getUserList(id, setCurrentListInfo), {
    refetchOnReconnect: true
  });
}
