import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/menus/UserMenu';
import logo from "@/public/logo.png"

const buttonLinks = [{ title: 'Search Lists', path: '/lists/searchLists' }];

export default function Header({}) {
  const { user } = useAuth();
  const { pathname } = useRouter();
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
            <Link href={'/'}>
              <a
                id='home-button'
                className={`cursor-pointer ${
                  pathname === '/' ? 'font-semibold' : 'hover:text-gray-700'
                }`}
              >
                Home
              </a>
            </Link>
            {user &&
              buttonLinks.map((button) => {
                return (
                  <Link href={button.path} key={button.title}>
                    <a
                      id={
                        button.title.toLowerCase().replace(' ', '-') +
                        '-page-button'
                      }
                      className={`cursor-pointer ${
                        pathname === button.path
                          ? 'font-semibold'
                          : 'hover:text-gray-700'
                      }`}
                    >
                      {button.title}
                    </a>
                  </Link>
                );
              })}
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