import { useConfig } from '../../hooks/useConfig';
import Footer from '../Footer';
import Header from '../Header';
export default function DefaultLayout({ children, footerLocation }) {
  const { data } = useConfig();
  return (
    <div className={'relative min-h-screen custom-scroll'}>
      <Header />
      <div className={'max-w-7xl mx-auto px-4 sm:px-4 lg:px-8'}>{children}</div>
      <Footer location={footerLocation} />
    </div>
  );
}