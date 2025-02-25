import * as xapiActions from '@/utils/xapi/events';
import { sendStatement } from '@/utils/xapi';

// Mock sendStatement so we can spy on calls
jest.mock('@/utils/xapi', () => {
  const actualModule = jest.requireActual('@/utils/xapi');
  return {
    ...actualModule,
    sendStatement: jest.fn(() => Promise.resolve({})),
  };
});

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
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/searched',
        display: {
          en: 'Searched',
        },
      },
      object: {
        id: 'https://fakeorigin.com/search?keyword=someKeyword',
        definition: {
          type: 'https://w3id.org/xapi/acrossx/activities/webpage',
          name: {
            en: 'ECC Search: someKeyword',
          },
        },
        objectType: 'Activity',
      },
      context: {
        extensions: {
          'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/search-term':
            'someKeyword',
        },
      },
    });
  });

  it('curated()', () => {
    xapiActions.curated('list123', 'Test List', 'List Description');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://xapi.edlm/profiles/edlm-ecc/concepts/verbs/curated',
        display: {
          en: 'Curated',
        },
      },
      object: {
        id: 'https://fakeorigin.com/lists/list123',
        definition: {
          type: 'http://id.tincanapi.com/activitytype/playlist',
          name: {
            en: 'Test List',
          },
          description: {
            en: 'List Description',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          'https://w3id.org/xapi/ecc/result/extensions/CuratedListId':
            'list123',
        },
      },
    });
  });

  it('socialized()', () => {
    xapiActions.socialized('courseABC', 'Cool Course', 'Awesome description');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/socialized',
        display: {
          en: 'Socialized',
        },
      },
      object: {
        id: 'https://fakeorigin.com/course/courseABC',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Cool Course',
          },
          description: {
            en: 'Awesome description',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          'https://w3id.org/xapi/ecc/result/extensions/CourseId': 'courseABC',
        },
      },
    });
  });

  it('prioritized()', () => {
    xapiActions.prioritized('someSavedSearchName', 'keyword123');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/prioritized',
        display: {
          en: 'Prioritized',
        },
      },
      object: {
        id: 'https://fakeorigin.com/search#save',
        definition: {
          type: 'https://w3id.org/xapi/acrossx/activities/search-engine',
          name: {
            en: 'ECC Search Term Saving',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          'https://w3id.org/xapi/ecc/result/extensions/searchTerm':
            'keyword123',
        },
      },
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
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: {
          en: 'Explored',
        },
      },
      object: {
        id: 'https://fakeorigin.com/course/courseXYZ',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Exploring Course',
          },
          description: {
            en: 'Course Description',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          'https://w3id.org/xapi/ecc/result/extensions/CourseId': 'courseXYZ',
        },
      },
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
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/registered',
        display: {
          en: 'Registered',
        },
      },
      object: {
        id: 'https://fakeorigin.com/course/course999',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Registration Course',
          },
          description: {
            en: 'Registration Course Description',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          'https://w3id.org/xapi/ecc/result/extensions/CourseId': 'course999',
        },
      },
    });
  });
});
