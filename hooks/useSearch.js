import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { oneHour, tenMinutes } from '../config/timeConstants';
import { getDeeplyNestedData } from "../utils/getDeeplyNestedData";

export default function useSearch(url) {
  const queryClient = useQueryClient();
  return useQuery(
    ['search', url],
    () => axios.get(url).then((res) => res.data),
    {
      staleTime: tenMinutes,
      onSuccess: () => {
        const config = queryClient.getQueryData(['ui-config']);
        const queryData = queryClient.getQueryData(['search', url]);
        queryData?.hits?.map((course) => {
          const data = {
            courseTitle: getDeeplyNestedData(
              config?.course_information?.course_title,
              course
            ),
            courseDescription: getDeeplyNestedData(
              config?.course_information?.course_description,
              course
            ),
            courseURL: getDeeplyNestedData(
              config?.course_information?.course_url,
              course
            ),
            courseHighlights: config?.course_highlights?.map((detail) => {
              return {
                name: detail?.display_name,
                value: getDeeplyNestedData(detail?.field_name, course),
              };
            }),
          };

          queryClient.setQueryData(['course', course.meta.id], data);
          queryClient.setQueryDefaults(['course', course.meta.id], {
            staleTime: oneHour,
            cacheTime: oneHour,
          });
        });
      },
    }
  );
}
