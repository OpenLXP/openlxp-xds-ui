import { render, screen } from '@testing-library/react';
import SearchResult from '@/components/cards/SearchResult';
import courseData from '@/__mocks__/data/course.data';
import { AuthContextWrapper } from '@/__mocks__/authContextMock';



describe('SearchResult', () => {
  it('should show a title, description and provider name', () => {
    render(
      <AuthContextWrapper>
        <SearchResult result={courseData} />
      </AuthContextWrapper>
    );

    expect(screen.getByText('Test Course Title')).toBeInTheDocument();
    expect(screen.getByText('Short Description')).toBeInTheDocument();
    expect(screen.getByText('Provider Name')).toBeInTheDocument();
  });

  it.skip('should show the share button', () => {
    render(
      <AuthContextWrapper>
        <SearchResult result={courseData} />
      </AuthContextWrapper>
    );
    expect(screen.getByTitle('share course')).toBeInTheDocument();
  });

  it('should show the view course button', () => {
    render(
      <AuthContextWrapper>
        <SearchResult result={courseData} />
      </AuthContextWrapper>
    );
    expect(screen.getByTitle('view course')).toBeInTheDocument();
  });

  it.skip('should show the save course button', () => {
    render(
      <AuthContextWrapper>
        <SearchResult result={courseData} />
      </AuthContextWrapper>
    );
    expect(screen.getByTitle('save course')).toBeInTheDocument();
  });
});
