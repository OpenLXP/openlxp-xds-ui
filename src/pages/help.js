import DefaultLayout from '@/components/layouts/DefaultLayout';

export default function Help() {
    return (
        <DefaultLayout>
        <div className='mt-10 pb-20'>
            <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>
            Help
            </h1>
            <h2 className='text-xl font-semibold'>Purpose</h2>
            <p className='pb-4 mb-2'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h2 className='text-xl font-semibold'>Features</h2>
            <p> Search course: </p>
            <p> Save search: </p>
            <p> Save courses to list: </p>
            <p> Search lists: </p>
            <p> Subscribing to lists: </p>
            <p className='pb-4 mb-2'> View lists: </p>

            <h2 className='text-xl font-semibold'>Course Providers</h2>
            <p className='pb-4 mb-2'>AETC: 6000+ courses, DAU: 1000+ courses, edX: 1500+ courses, JKO: 1000+ courses </p>

        </div>
    </DefaultLayout>
    )
}