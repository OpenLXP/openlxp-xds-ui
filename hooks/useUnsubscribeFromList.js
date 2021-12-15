import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {interestLists} from "../config/endpoints";

export function useUnsubscribeFromList(token) {
  const queryClient = useQueryClient();
  return useMutation(
    ({id}) => axios.patch(interestLists + id + "/unsubscribe", {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('interestLists');
        queryClient.invalidateQueries('subscribedLists');
      }
    }
  );
}
