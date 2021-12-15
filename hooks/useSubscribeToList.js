import {useMutation, useQueryClient} from "react-query";
import {interestLists} from "../config/endpoints";
import { axiosInstance } from 'config/axiosConfig';

export function useSubscribeToList() {
  const queryClient = useQueryClient();
  return useMutation(
    ({id}) => axiosInstance.patch(
      interestLists + id + '/subscribe',
      {
      }
    ).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('interestLists');
        queryClient.invalidateQueries('subscribedLists');
      }
    }
  )
    ;
}
