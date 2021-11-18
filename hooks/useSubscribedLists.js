import axios from "axios";
import { useQuery } from "react-query";
import { interestLists } from "../config/endpoints";

export function useSubscribedLists(token) {

  return useQuery('subscribedLists', () => axios.get(
    interestLists + 'subscriptions',
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  ).then(res => res.data));
}

