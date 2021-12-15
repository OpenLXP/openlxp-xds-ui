import { useQuery } from 'react-query';
import { interestLists } from '../config/endpoints';
import axios from 'axios';

export function useList(id) {
  return useQuery(['list', id], () =>
    axios.get(interestLists + id).then((res) => res.data)
  );
}
