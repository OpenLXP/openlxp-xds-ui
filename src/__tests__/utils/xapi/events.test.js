import * as xapiActions from '@/utils/xapi/events';
import { sendStatement } from '@/utils/xapi';

// Mock sendStatement so we can spy on calls
jest.mock('@/utils/xapi', () => ({
  sendStatement: jest.fn(),
}));

describe('xAPI Actions', () => {
  // We’ll temporarily override window.location so we can check the expected origin
  const originalLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { origin: 'https://fakeorigin.com' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searched()', () => {
    xapiActions.searched('someKeyword');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'searched',
      object: {
        id: 'https://fakeorigin.com/search',
        definitionName: 'ECC Search Capability',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
      resultExtValue: 'someKeyword',
    });
  });

  it('curated()', () => {
    xapiActions.curated('list123', 'Test List', 'List Description');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'curated',
      object: {
        id: 'https://fakeorigin.com/lists/list123',
        definitionName: 'Test List',
        description: 'List Description',
      },
      resultExtName:
        'https://w3id.org/xapi/ecc/result/extensions/CuratedListId',
      resultExtValue: 'list123',
    });
  });

  it('socialized()', () => {
    xapiActions.socialized('courseABC', 'Cool Course', 'Awesome description');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'socialized',
      object: {
        id: 'https://fakeorigin.com/course/courseABC',
        definitionName: 'Cool Course',
        description: 'Awesome description',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: 'courseABC',
    });
  });

  it('prioritized()', () => {
    xapiActions.prioritized('someSavedSearchName', 'keyword123');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'prioritized',
      object: {
        id: 'https://fakeorigin.com/search#save',
        definitionName: 'ECC Search Term Saving',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
      resultExtValue: 'keyword123',
    });
  });

  it('explored()', () => {
    xapiActions.explored(
      'courseXYZ',
      'https://fakeorigin.com/course/courseXYZ',
      'Exploring Course',
      'Course Description'
    );

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'explored',
      object: {
        id: 'https://fakeorigin.com/course/courseXYZ',
        definitionName: 'Exploring Course',
        description: 'Course Description',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: 'courseXYZ',
    });
  });

  it('registered()', () => {
    xapiActions.registered(
      'course999',
      'https://fakeorigin.com/course/course999',
      'Registration Course',
      'Registration Course Description'
    );

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: 'registered',
      object: {
        id: 'https://fakeorigin.com/course/course999',
        definitionName: 'Registration Course',
        description: 'Registration Course Description',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: 'course999',
    });
  });
});
