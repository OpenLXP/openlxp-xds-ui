// Grabs the main host url
const hostURL = process.env.REACT_APP_BACKEND_HOST;
const apiPath = "/api";
const elasticSearchPath = "/es-api";



// Exported endpoints
export const backendHost = `${hostURL}`;
export const elasticSearchApi = `${hostURL}${elasticSearchPath}/`;
export const elasticSearchMoreLikeThisApi = `${hostURL}${elasticSearchPath}/more-like-this/`;
export const spotlightCoursesApi = `${hostURL}${apiPath}/spotlight-courses`;
export const configurationApi = `${hostURL}${apiPath}/ui-configuration/`;
export const authenticationApi = `${hostURL}${apiPath}/auth`;
export const courseApi = `${hostURL}${apiPath}/experiences/`;


// user specific endpoints
export const addCourseToList = `${hostURL}${apiPath}/experiences/`;
export const userOwnedLists = `${hostURL}${apiPath}/interest-lists/owned`;
export const userSubscribedLists = `${hostURL}${apiPath}/interest-lists/subscriptions`;
export const userAllLists = `${hostURL}${apiPath}/interest-lists/`;

export default {
  spotlightCoursesApi,
  addCourseToList,
  userAllLists,
  userOwnedLists,
  userSubscribedLists,
  backendHost,
  configurationApi,
  elasticSearchApi,
  elasticSearchMoreLikeThisApi,
  authenticationApi,
};
