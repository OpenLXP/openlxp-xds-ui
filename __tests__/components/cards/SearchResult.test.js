import { act, screen, render, fireEvent } from '@testing-library/react';
import { createContext } from 'react';
import SearchResult from '../../../components/cards/SearchResult';
import { AuthProvider } from '../../../contexts/AuthContext';
import courseData from '../../../__mocks__/data/course.data';

const AuthContext = createContext();
const Wrapper = ({ children }) => {
  const user = { user: { user: { email: 'email' } } };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

describe('SearchResult', () => {
  it('should show a title, description and provider name', () => {
    render(
      <Wrapper>
        <SearchResult result={courseData} />
      </Wrapper>
    );

    expect(screen.getByText('Test Course Title')).toBeInTheDocument();
    expect(screen.getByText('Short Description')).toBeInTheDocument();
    expect(screen.getByText('Provider Name')).toBeInTheDocument();
  });

  it('should show the share button', () => {
    render(
      <Wrapper>
        <SearchResult result={courseData} />
      </Wrapper>
    );
    expect(screen.getByTitle('share course')).toBeInTheDocument();
  });

  it('should show the view course button', () => {
    render(
      <Wrapper>
        <SearchResult result={courseData} />
      </Wrapper>
    );
    expect(screen.getByTitle('view course')).toBeInTheDocument();
  });

  it.skip('should show the save course button', () => {
    render(
      <Wrapper>
        <SearchResult result={courseData} />
      </Wrapper>
    );
    expect(screen.getByTitle('save course')).toBeInTheDocument();
  });
});
