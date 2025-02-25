import { sendStatement, xapiObject } from '@/utils/xapi';

// when a search fires from the index or search page
export function searched(keyword) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/acrossx/verbs/searched',
      display: {
        en: 'Searched',
      },
    },
    object: xapiObject(
      `${window.location.origin}/search?keyword=${keyword}`,
      'https://w3id.org/xapi/acrossx/activities/webpage',
      'en',
      `ECC Search: ${keyword}`
    ),
    result: {
      response: keyword,
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/searchTerm': keyword, // TODO: Move this and all others to context extensions
      },
    },
  });
}

// when a user saves a list of courses
export function curated(listId, listName, listDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/dod-isd/verbs/curated', // TODO: Import this verb in to our profile so it exists
      display: {
        en: 'Curated',
      },
    },
    object: xapiObject(
      `${window.location.origin}/lists/${listId}`,
      'http://id.tincanapi.com/activitytype/playlist',
      'en',
      listName,
      listDescription
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/CuratedListId': listId,
      },
    },
  });
}

// when a user shares the ECC course page
export function socialized(courseId, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      // TODO: Change this to shared, put in profile
      id: 'https://w3id.org/xapi/tla/verbs/socialized',
      display: {
        en: 'Socialized',
      },
    },
    object: xapiObject(
      `${window.location.origin}/course/${courseId}`,
      'https://w3id.org/xapi/cmi5/activitytype/course', // TODO: This is really a more general learning resource
      'en',
      courseTitle,
      courseDescription
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/CourseId': courseId,
      },
    },
  });
}

// when a user saves a search
// TODO: utilize saved search name
export function prioritized(name, keyword) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/acrossx/verbs/prioritized', // TODO: change to saved
      display: {
        en: 'Prioritized',
      },
    },
    object: xapiObject(
      `${window.location.origin}/search#save`, // TODO: incorporate term
      'https://w3id.org/xapi/acrossx/activities/search-engine', // TODO: webpage, same as search
      'en',
      'ECC Search Term Saving'
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/searchTerm': keyword, // TODO: add search name to extensions
      },
    },
  });
}

// when a user views a course
// TODO: Every course NEEDS to have an IRI
export function explored(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/tla/verbs/explored',
      display: {
        en: 'Explored',
      },
    },
    object: xapiObject(
      courseUrl,
      'https://w3id.org/xapi/cmi5/activitytype/course',
      'en',
      courseTitle,
      courseDescription
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/CourseId': courseId,
      },
    },
  });
}

// when a user follows the registration link for a course
// TODO: Bring this up, this is a significant verb in other contexts
export function registered(
  courseId,
  courseUrl,
  courseTitle,
  courseDescription
) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/tla/verbs/registered', // TODO: Viewed
      display: {
        en: 'Registered',
      },
    },
    object: xapiObject(
      courseUrl,
      'https://w3id.org/xapi/cmi5/activitytype/course',
      'en',
      courseTitle,
      courseDescription
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/CourseId': courseId,
      },
    },
  });
}
