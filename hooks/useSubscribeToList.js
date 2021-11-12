import {useMutation, useQueryClient} from "react-query";
import {interestLists} from "../config/endpoints";
import axios from "axios";

export function useSubscribeToList(token) {
  const queryClient = useQueryClient();
  return useMutation(
    ({id}) => axios.patch(
      interestLists + id + '/subscribe',
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
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
