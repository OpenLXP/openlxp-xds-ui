import { ShareIcon } from '@heroicons/react/solid';
import useTimeout from '../../hooks/useTimeout';
import useWindow from '../../hooks/useWindow';

export default function ShareBtn({ id }) {
  const [show, setShow] = useTimeout(1000);
  function copyToClipboard() {
    if (typeof window === 'undefined') return;

    // get the current address
    const hostName = window.location.hostname;

    // get the current port
    const portNumber = window.location.port;

    if (hostName && portNumber) {
      navigator.clipboard.writeText(`${hostName}:${portNumber}/course/${id}`);
    } else if (hostName && !portNumber) {
      navigator.clipboard.writeText(`${hostName}/course/${id}`);
    }
    // showing the copy message
    setShow();
  }

  return (
    <button
      onClick={ copyToClipboard }
      title='share course'
      className='flex justify-center items-center gap-2 text-blue-400 rounded-full hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white p-1.5 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
    >
      <ShareIcon className='h-5 w-5' />
      <div
        className={`${
          show ? 'block' : 'invisible'
        } absolute -bottom-12 text-white text-xs px-2 py-2 flex items-center justify-center flex-col`}
      >
        <span className='w-4 h-4 bg-blue-400 transform rotate-45 rounded-sm -mb-2 z-10 shadow-md'></span>
        <div className='min-w-min bg-blue-400 px-4 py-1 z-20 rounded-sm shadow-md font-semibold'>
          Copied!
        </div>
      </div>
    </button>
  );
}
