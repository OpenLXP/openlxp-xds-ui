import { useQuery } from 'react-query';
import { configUrl } from '../config/endpoints';
import { twentyFourHours } from '../config/timeConstants';
import axios from "axios";

export default function useConfig() {
  return useQuery(
    'ui-config',
    () => axios.get(configUrl).then((res) => res.data),
    {
      staleTime: twentyFourHours,
    }
  );
}
