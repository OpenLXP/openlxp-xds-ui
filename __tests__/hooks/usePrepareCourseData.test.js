import uiConfigData from '../../__mocks__/data/uiConfig.data';
import courseData from '../../__mocks__/data/course.data';
import usePrepareCourseData from '../../hooks/usePrepareCourseData';

describe('usePrepareCourseData', () => {
  it('should return correct data when passed a uiConfig & data', () => {
    const data = usePrepareCourseData(uiConfigData, courseData);

    expect(data).toEqual({
      courseDescription: null,
      courseDetails: [
        {
          displayName: 'Course Code',
          value: '1234',
        },
      ],
      courseTitle: 'Test Course Title',
      courseUrl: 'CourseURL',
      coursePhoto: 'undefinedsome/fallback',
    });
  });
  it('should return the correct number of highlights based on active state', () => {
    const data = usePrepareCourseData(uiConfigData, courseData);
    expect(data.courseDetails.length).toBe(1);

    const modifiedUiData = {
      ...uiConfigData,
      course_highlights: [
        {
          display_name: 'Course Code',
          field_name: 'Course.CourseCode',
          active: true,
        },
        {
          display_name: 'Course Code',
          field_name: 'Course.CourseCode',
          active: false,
        },
        {
          display_name: 'Course Code',
          field_name: 'Course.CourseCode',
          active: true,
        },
      ],
    };

    const modifiedData = usePrepareCourseData(modifiedUiData, data);
    expect(modifiedData.courseDetails.length).toBe(2);
  });
  it('should map a photo provided by the data', () => {
    const modifiedCourseData = {
      ...courseData,
      Technical_Information: { Thumbnail: 'some/where/special' },
    };
    const data = usePrepareCourseData(uiConfigData, modifiedCourseData);

    expect(data).toEqual({
      courseDescription: null,
      courseDetails: [
        {
          displayName: 'Course Code',
          value: '1234',
        },
      ],
      courseTitle: 'Test Course Title',
      courseUrl: 'CourseURL',
      coursePhoto: 'some/where/special',
    });
  });
});
