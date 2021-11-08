import { useQuery } from 'react-query';
import axios from 'axios';
import { interestLists } from '../config/endpoints';
import { oneHour } from '../config/timeConstants';

/**
 * @function useInterestLists
 * @description Hook to get all of the interest lists
 * @returns {useQuery}
 */

export function useInterestLists() {
  return useQuery(
    'lists',
    () => axios.get(interestLists).then((res) => res.data),
    {
      staleTime: oneHour,
      retry: false,
    }
  );
}
