import { EyeIcon } from '@heroicons/react/solid';
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ViewBtn({ id }) {

  const { user } = useAuth();

  //xAPI Statement
  const xAPISendStatement = (courseId) => {
    if (user) {
      const verb = {
        id: "https://w3id.org/xapi/tla/verbs/explored",
        display: "explored"
      }

      const domain = (new URL(window.location));
      const objectId = `${domain.origin}/course`;
      const objectDefName = "ECC Course Viewing"
      const resultExtName = "https://w3id.org/xapi/ecc/result/extensions/CourseViewed";

      sendStatement(user.user, verb, objectId, objectDefName, resultExtName, courseId);
    }
  }

  return (
    <Link href={{ pathname: `/course/${id}` }}>
      <button
        id={'view-course-button-' + id}
        className='flex justify-center items-center gap-2 text-blue-400 rounded-full hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-2 p-1.5 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
        title='view course'
        onClick={() => xAPISendStatement(id)}
      >
        <EyeIcon className='h-5 w-5' /> View Course
      </button>
    </Link>
  );
}
