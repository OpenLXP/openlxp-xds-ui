import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import SaveBtn from '../buttons/SaveBtn';
import ShareBtn from '../buttons/ShareBtn';
import ViewBtn from '../buttons/ViewBtn';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const { CourseTitle, CourseShortDescription, CourseProviderName } =
    result.Course;
  const { id } = result.meta;

  return (
    <div>
      <div className='inline-flex gap-2 justify-between items-center w-full'>
        <Link href={'/course/' + id}>
          <button>
            <h1
              className='text-xl font-semibold line-clamp-1 hover:underline hover:text-blue-400 cursor-pointer hover:text-shadow'
              title={CourseTitle}
            >
              {CourseTitle}
            </h1>
          </button>
        </Link>
        <div className='inline-flex gap-2'>
          <ViewBtn id={id} />
          <ShareBtn id={id} />
          {user && <SaveBtn id={id} />}
        </div>
      </div>
      <h2 className={'font-normal font-sans'}>
        <span className={'font-semibold'}>Provider:&nbsp;</span>
        {CourseProviderName}
      </h2>
      <p className={'line-clamp-3'}>{CourseShortDescription}</p>
    </div>
  );
}
