import { useRouter } from 'next/dist/client/router';
import { useQuery, useQueryClient } from 'react-query';
import React from 'react';
import useCourse from '../../hooks/useCourse';
import useConfig from '../../hooks/useConfig';

export default function Course() {
  const { query } = useRouter();
  const { data, isSuccess, isStale, isError } = useCourse(query?.courseId);


  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
