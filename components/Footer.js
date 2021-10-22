import React from 'react';

export default function Footer({ location }) {
  const leftLinks = [
    { name: 'Home', url: 'https://dodcio.defense.gov/' },
    { name: 'About DOD', url: 'https://dodcio.defense.gov/About-DoD-CIO/' },
    { name: 'Web Policy', url: 'https://dodcio.defense.gov/DoD-Web-Policy/' },
  ];
  const rightLinks = [
    {
      name: 'Privacy',
      url: 'https://dodcio.defense.gov/Home/Privacy-Policy.aspx',
    },
    { name: 'Contact US', url: 'https://dodcio.defense.gov/Contact/' },
  ];

  const makeExternalLinks = (links) =>
    links.map((link, index) => {
      return (
        <a
          key={index}
          className='text-center text-gray-500 text-base p-1 hover:text-gray-900 h-auto hover:text-shadow-md transform transition-all duration-75 ease-in-out'
          href={link.url}
        >
          {link.name}
        </a>
      );
    });

  return (
    <div
      className={
        location + ' bottom-0 bg-gray-200 bg-opacity-90 w-full h-16 shadow z-50'
      }
    >
      <nav className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div className={'w-full py-4 inline-flex items-center justify-between'}>
          <div className={'flex items-center gap-4'}>
            {makeExternalLinks(leftLinks)}
          </div>
          <div className={'flex items-right gap-4'}>
            {makeExternalLinks(rightLinks)}
          </div>
        </div>
      </nav>
    </div>
  );
}
