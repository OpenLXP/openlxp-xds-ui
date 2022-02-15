import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/menus/UserMenu';
import logo from '@/public/logo.png';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Search Lists',
    path: '/lists/searchLists',
  },
  {
    label: 'About ECC',
    path: '/about',
  },
  {
    label: 'Help',
    path: '/help',
  },
];

function Button({ data }) {
  const router = useRouter();
  if (data.path === router.asPath) {
    return (
      <Link href={data.path}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className='px-1 font-bold text-gray-800 border-b-2 border-gray-800 hover:text-gray-900'>
          {data.label}
        </a>
      </Link>
    );
  }
  return (
    <Link href={data.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className='transition-all duration-100 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-900'>
        {data.label}
      </a>
    </Link>
  );
}

export default function Header() {
  const { user } = useAuth();
  return (
    <header className={'bg-white w-full shadow z-50'}>
      <nav
        className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
        aria-label={'Top'}
      >
        <div
          className={
            'w-full py-4 inline-flex items-center justify-between z-50'
          }
        >
          <div className={'flex items-center justify-start gap-2'}>
            <Link href={'/'}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                title='home'
                id={'homepage-button'}
                className={'cursor-pointer'}
              >
                <Image src={logo} alt={'home'} height={'60'} width={'60'} />
              </a>
            </Link>
            {menuItems.map((item) => {
              if (item.label != 'Search Lists') {
                return <Button key={item.label} data={item} />;
              }
              if (user) {
                return <Button key={item.label} data={item} />;
              }
            })}
          </div>

          {!user && (
            <div className={'space-x-4'}>
              <Link href={'/login'}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className='bg-blue-500 py-2 px-4 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'>
                  Sign in
                </a>
              </Link>
              <Link href={'/register'}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
