import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {interestLists} from "../config/endpoints";

export function useSubscribedLists(token) {
  const queryClient = useQueryClient();

  return useQuery('subscribedLists', () => axios.get(
    interestLists + 'subscriptions',
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  ).then(res => res.data));
}

