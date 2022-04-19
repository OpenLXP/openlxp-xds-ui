import { ShareIcon } from '@heroicons/react/outline';

import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';

export default function ShareButton({ id, courseTitle, courseDescription }) {
  const { user } = useAuth();

  const handleClick = useCallback(() => {
    if (!user) return;
    console.count('share button clicked');

    const context = {
      actor: {
        first_name: user?.user?.first_name || 'anonymous',
        last_name: user?.user?.last_name || 'user',
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/socialized',
        display: 'socialized',
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

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-2 min-w-max whitespace-nowrap p-2 text-center text-white hover:shadow-md rounded-sm bg-blue-400 hover:bg-blue-600  font-medium transform transition-all duration-75 ease-in-out focus:ring-2 ring-blue-400 outline-none'
    >
      <ShareIcon className='h-5 w-5' />
      Share
    </button>
  );
}
