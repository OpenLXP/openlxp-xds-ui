import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import SaveModal from '@/components/modals/SaveModal';
import { useConfig } from '@/hooks/useConfig';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();
  const config = useConfig();

  const title = useMemo(() => {
    return getDeeplyNestedData(
      config.data?.course_information?.course_title,
      result
    );
  }, [config.isSuccess, config.data]);

  const handleClick = useCallback(() => {
    router.push(`/course/${result.meta.id}`);
  }, [result, router]);

  return (
    <div
      className='group hover:text-blue-400 hover:text-shadow cursor-pointer pr-2 pl-1 py-1 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500'
      title={title || result.Course.CourseTitle}
    >
      <div className='flex justify-between items-center'>
        <button
          className='text-lg font-semibold group-hover:underline w-full text-left focus:outline-none'
          onClick={handleClick}
        >
          <h3>{title || result.Course.CourseTitle}</h3>
        </button>
        {user && (
          <SaveModal
            courseId={result.meta.id}
            title={title || result.Course.CourseTitle}
          />
        )}
      </div>
      <div onClick={handleClick} className='text-left' aria-hidden='true'>
        <h4>
          <strong>Provider:&nbsp;</strong>
          {getDeeplyNestedData(
            config.data?.course_information?.course_provider,
            result
          ) || result.Course.CourseProviderName}
        </h4>
        <p className='line-clamp-4 pr-4'>
          {removeHTML(
            getDeeplyNestedData(
              config.data?.course_information?.course_description,
              result
            )
          ) || removeHTML(result.Course.CourseShortDescription)}
        </p>
      </div>
    </div>
  );
}
