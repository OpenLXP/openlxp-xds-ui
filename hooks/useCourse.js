import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { courseUrl } from '../config/endpoints';
import { getDeeplyNestedData } from '../utils/getDeeplyNestedData';
export default function useCourse(courseId) {
  const queryClient = useQueryClient();

  return useQuery(
    ['course', courseId],
    () => axios.get(courseUrl + courseId).then((res) => res.data),
    {
      onSuccess: () => {
        const { data: course } = queryClient.getQueryData(['course', courseId]);
        const { data: config } = queryClient.getQueryData(['ui-config']);

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
      },
    }
  );
}
