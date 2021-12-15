import { useQuery } from 'react-query';
import { configUrl } from '../config/endpoints';
import { twentyFourHours } from '../config/timeConstants';
import axios from 'axios';

/**
 * @description Reaches out to the backend and gets the configuration data required for the application. Valid for 24hrs
 */
export function useConfig() {
  return useQuery(
    'ui-config',
    () => axios.get(configUrl).then((res) => res.data),
    {
      staleTime: twentyFourHours,
      cacheTime: twentyFourHours,
    }
  );
}
