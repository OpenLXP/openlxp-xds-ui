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
      `${window.location.origin}/search?keyword=${keyword}`, // TODO: incorporate term
      'https://w3id.org/xapi/acrossx/activities/webpage', // TODO: confirm
      'en',
      `ECC Search: ${keyword}`
    ),
    result: {
      response: keyword, // TODO: Confirm, we do this in Moodle
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/searchTerm': keyword,
      },
    },
  });
}

// when a user saves a list of courses
export function curated(listId, listName, listDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/dod-isd/verbs/curated',
      display: {
        en: 'Curated',
      },
    },
    object: xapiObject(
      `${window.location.origin}/lists/${listId}`,
      'http://id.tincanapi.com/activitytype/playlist', // TODO: confirm
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
      // TODO: Bring this up. This should probably be http://adlnet.gov/expapi/verbs/shared
      id: 'https://w3id.org/xapi/tla/verbs/socialized',
      display: {
        en: 'Socialized',
      },
    },
    object: xapiObject(
      `${window.location.origin}/course/${courseId}`,
      'https://w3id.org/xapi/cmi5/activitytype/course', // TODO: confirm
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
      id: 'https://w3id.org/xapi/acrossx/verbs/prioritized',
      display: {
        en: 'Prioritized',
      },
    },
    object: xapiObject(
      `${window.location.origin}/search#save`, // TODO: incorporate term
      'https://w3id.org/xapi/acrossx/activities/search-engine', // TODO: placeholder, replace
      'en',
      'ECC Search Term Saving'
    ),
    result: {
      extensions: {
        'https://w3id.org/xapi/ecc/result/extensions/searchTerm': keyword,
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
      'https://w3id.org/xapi/cmi5/activitytype/course', // TODO: confirm
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
      id: 'https://w3id.org/xapi/tla/verbs/registered',
      display: {
        en: 'Registered',
      },
    },
    object: xapiObject(
      courseUrl,
      'https://w3id.org/xapi/cmi5/activitytype/course', // TODO: confirm
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
