import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/menus/UserMenu';
import logo from '@/public/logo.png';

export default function Header({}) {
  const { user } = useAuth();
  return (
    <header className={'absolute top-0 bg-white w-full shadow z-50'}>
      <nav
        className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
        aria-label={'Top'}
      >
        <div className={'w-full py-4 inline-flex items-center justify-between'}>
          <div className={'flex items-center gap-4'}>
            <Link href={'/'}>
              <a
                title='home'
                id={'homepage-button'}
                className={'cursor-pointer'}
              >
                <Image src={logo} alt={'home'} height={'60'} width={'60'} />
              </a>
            </Link>
          </div>
          {!user && (
            <div className={'space-x-4'}>
              <Link href={'/login'}>
                <a className='bg-blue-500 py-2 px-4 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'>
                  Sign in
                </a>
              </Link>
              <Link href={'/register'}>
                <a className='bg-blue-300 py-2 px-4 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'>
                  Sign up
                </a>
              </Link>
            </div>
          )}
          {user && <UserMenu />}
        </div>
      </nav>
    </header>
  );
}
