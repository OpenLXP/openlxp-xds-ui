import Link from 'next/link';

export default function NotAuthorized({ errorMessage }) {
    
    // should hang on page for 15 seconds
    // should show count down to redierect 
    // should have a button to go home
    // redirect at end of countdown to home.
    
    setInterval(function() {
        try{
            let div = document.querySelector("#counter");
            let count = div.textContent * 1 - 1;
            div.textContent = count;
            if (count <= 0) {
                window.location.replace("/");
            }
        }
        catch{

        }
    }, 1000);

      
    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
        <div className='inline-flex -mt-16 items-center gap-4'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className='text-5xl font-semibold'>401 Unauthorized </h1>
        </div>
        <div className='inline-flex items-center gap-4'>
            <h2 className='text-2xl flex-col'>Redirecting in</h2>
            <div className='text-2xl' id="counter">15</div>
        </div>
        <Link href={'/'}>
        <button
                id={'create-account-button'}
                className='text-blue-400 hover:underline hover:text-blue-500 cursor-pointer transition-all duration-150 ease-in-out text-xl'
              > or Click Here to Redirect</button>
              </Link>
        </div>
    )
}