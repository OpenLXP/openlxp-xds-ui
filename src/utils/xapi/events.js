import { sendStatement } from '@/utils/xapi';

// when a search fires from the index or search page
export function searched(keyword) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/acrossx/verbs/searched',
      display: {
        'en-US': 'Searched',
      },
    },
    object: {
      id: `${window.location.origin}/search`,
      definitionName: 'ECC Search Capability',
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
    resultExtValue: keyword,
  });
}

// when a user saves a list of courses
export function curated(listId, listName, listDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/dod-isd/verbs/curated',
      display: {
        'en-US': 'Curated',
      },
    },
    object: {
      id: `${window.location.origin}/lists/${listId}`,
      definitionName: listName,
      description: listDescription,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CuratedListId',
    resultExtValue: listId,
  });
}

// when a user shares the ECC course page
export function socialized(courseId, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      // TODO: Bring this up. This should probably be http://adlnet.gov/expapi/verbs/shared
      id: 'https://w3id.org/xapi/tla/verbs/socialized',
      display: {
        'en-US': 'Socialized',
      },
    },
    object: {
      definitionName: courseTitle,
      description: courseDescription,
      id: `${window.location.origin}/course/${courseId}`,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
    resultExtValue: courseId,
  });
}

// when a user saves a search
// TODO: utilize saved search name
export function prioritized(name, keyword) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/acrossx/verbs/prioritized',
      display: {
        'en-US': 'Prioritized',
      },
    },
    object: {
      id: `${window.location.origin}/search#save`, // TODO: incorporate term
      definitionName: 'ECC Search Term Saving',
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
    resultExtValue: keyword,
  });
}

// when a user views a course
// TODO: Every course NEEDS to have an IRI
export function explored(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/tla/verbs/explored',
      display: {
        'en-US': 'Explored',
      },
    },
    object: {
      definitionName: courseTitle,
      description: courseDescription,
      id: courseUrl,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
    resultExtValue: courseId,
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
        'en-US': 'Registered',
      },
    },
    object: {
      definitionName: courseTitle,
      description: courseDescription,
      id: courseUrl,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
    resultExtValue: courseId,
  });
}
