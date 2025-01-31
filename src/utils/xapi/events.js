import { sendStatement } from '@/utils/xapi';

// when a search fires from the index or search page
export function searched(keyword) {
  sendStatement({
    verb: 'searched',
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
    verb: 'curated',
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
    verb: 'socialized',
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
    verb: 'prioritized',
    object: {
      id: `${window.location.origin}/search#save`,
      definitionName: 'ECC Search Term Saving',
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
    resultExtValue: keyword,
  });
}

// when a user views a course
export function explored(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: 'explored',
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
export function registered(
  courseId,
  courseUrl,
  courseTitle,
  courseDescription
) {
  sendStatement({
    verb: 'registered',
    object: {
      definitionName: courseTitle,
      description: courseDescription,
      id: courseUrl,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
    resultExtValue: courseId,
  });
}
