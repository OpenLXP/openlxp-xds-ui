// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;
const api = '/api/';
const elasticApi = '/es-api/';

// authentication urls
export const authLogin = `${backendHost}${api}auth/login`;
export const authRegister = `${backendHost}${api}auth/register`;
export const authLogout = `${backendHost}${api}auth/logout`;

// configuration url
export const configUrl = `${backendHost}${api}ui-configuration/`;

// spotlight courses url
export const spotlightCourses = `${backendHost}${api}spotlight-courses`;

// all the interest lists
export const interestLists = `${backendHost}${api}interest-lists/`;
export const userOwnedLists = `${backendHost}${api}interest-lists/owned`;

// course url
export const courseUrl = `${backendHost}${api}experiences/`;

// search url
export const searchUrl = `${process.env.NEXT_PUBLIC_MIKES_SPECIAL_SEARCH || backendHost}${elasticApi}`;

// More like this
export const moreLikeThisUrl = `${backendHost}${elasticApi}more-like-this/`;

// Save Search
export const saveSearchUrl = `${backendHost}${api}saved-filters`;
export const saveSearchOwnedUrl = `${backendHost}${api}saved-filters/owned`;