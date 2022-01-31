import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import SaveModal from '@/components/modals/SaveModal';
import ShareBtn from '@/components/buttons/ShareBtn';
import ViewBtn from '@/components/buttons/ViewBtn';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const { CourseTitle, CourseShortDescription, CourseProviderName } =
    result.Course;
  const { id } = result.meta;

  return (
    <div className={'overflow-x-hidden py-2 pr-2'}>
      <div className='inline-flex gap-2 justify-between items-center w-full'>
        <Link href={'/course/' + id} passHref>
          <h2
            id='link-to-course'
            className='text-lg font-semibold line-clamp-2 hover:underline hover:text-blue-400 cursor-pointer hover:text-shadow'
            title={CourseTitle}
          >
            {CourseTitle}
          </h2>
        </Link>
        <div className='inline-flex flex-shrink-0 gap-2'>
          <ViewBtn id={id} />
          <ShareBtn id={id} />
          {user && <SaveModal courseId={id} />}
        </div>
      </div>
      <h2 className={'font-normal font-sans'}>
        <span className={'font-semibold'}>Provider:&nbsp;</span>
        {CourseProviderName}
      </h2>
      <p className={'line-clamp-4'}>{CourseShortDescription.replace( /(<([^>]+)>)/ig, '')}</p>
    </div>
  );
}
