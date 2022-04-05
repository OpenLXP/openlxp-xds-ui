import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SaveModal from '@/components/modals/SaveModal';
import ViewBtn from '@/components/buttons/ViewBtn';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = useCallback(() => {
    const context = {
      actor: {
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/course/${result.meta.id}`,
        definitionName: result.Course.CourseTitle,
        description: result.Course.CourseShortDescription,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: result.meta.id,
    };

    xAPISendStatement(context);
    router.push(`/course/${result.meta.id}`);
  }, [result, user, router]);

  return (
    <div className='py-2 pr-2'>
      <div className='inline-flex gap-2 justify-between items-center w-full'>
        <button
          id='link-to-course'
          className='text-lg font-semibold line-clamp-2 hover:underline hover:text-blue-400 cursor-pointer hover:text-shadow'
          title={result.Course.CourseTitle}
          onClick={handleClick}
        >
          <h3>{result.Course.CourseTitle}</h3>
        </button>
        <span className='inline-flex flex-shrink-0 gap-2'>
          <ViewBtn
            id={result.meta.id}
            courseTitle={result.Course.CourseTitle}
            courseDescription={result.Course.CourseShortDescription}
          />
          {user && <SaveModal courseId={result.meta.id} />}
        </span>
      </div>
      <h2 className={'font-normal font-sans'}>
        <span className={'font-semibold'}>Provider:&nbsp;</span>
        {result.Course.CourseProviderName}
      </h2>
      <p className={'line-clamp-4'}>
        {removeHTML(result.Course.CourseShortDescription)}
      </p>
    </div>
  );
}
