import { EyeIcon } from '@heroicons/react/solid';
<<<<<<< HEAD
import { sendStatement } from '@/utils/xapi/xAPIWrapper';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ViewBtn({ id }) {

  const { user } = useAuth();

  //xAPI Statement
  const xAPISendStatement = (objectId) => {
    if (user) {
      const verb = {
        id: "https://w3id.org/xapi/tla/verbs/explored",
        display: "explored"
      }
      sendStatement(user.user, verb, objectId);
    }
  }
=======
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import Link from 'next/link';

export default function ViewBtn({ id, courseTitle, courseDescription }) {
  const { user } = useAuth();

  const handleClick = useCallback(() => {
    if (!user) return;
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
        definitionName: courseTitle,
        description: courseDescription,
        id: `${window.origin}/course/${id}`,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: id,
    };
    xAPISendStatement(context);
  }, [id, courseTitle, courseDescription, user]);
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985

  return (
    <Link href={{ pathname: `/course/${id}` }} passHref>
      <button
        id={'view-course-button-' + id}
        className='flex justify-center items-center gap-2 text-blue-400 rounded-full hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-2 p-1.5 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
        title='view course'
<<<<<<< HEAD
        onClick={() => {
          const domain = (new URL(window.location));
          const objectId = `${domain.origin}/course/${id}`;
          xAPISendStatement(objectId);
        }}
=======
        onClick={handleClick}
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
      >
        <EyeIcon className='h-5 w-5' /> View Course
      </button>
    </Link>
  );
}
