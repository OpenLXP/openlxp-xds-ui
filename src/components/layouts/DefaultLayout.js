import { useConfig } from '../../hooks/useConfig';
import Footer from '../Footer';
import Header from '../Header';

export default function DefaultLayout({ children, footerLocation }) {
  const { data } = useConfig();
  return (
    <div className={'relative custom-scroll min-h-screen'}>
      <Header />
<<<<<<< HEAD
      <div className='max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 min-h-screen'>{children}</div>
=======
      <div className='max-w-7xl mx-auto px-4 sm:px-4 lg:px-8'>{children}</div>
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
      <Footer location={footerLocation} />
    </div>
  );
}
