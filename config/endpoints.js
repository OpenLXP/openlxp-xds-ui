// local host endpoint from .env
const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;
const api = 'api/';
const elasticApi = 'es-api/';

// authentication urls
export const authLogin = `${backendHost}${api}auth/login`;
export const authRegister = `${backendHost}${api}auth/register`;
export const authLogout = `${backendHost}${api}auth/logout`;

// configuration url
export const configUrl = `${backendHost}${api}ui-configuration/`;

//
export const interestLists = `${backendHost}${api}interest-lists/`;

// course url
export const courseUrl = `${backendHost}${api}experiences/`

// search url
export const searchUrl = `${backendHost}${elasticApi}`;
