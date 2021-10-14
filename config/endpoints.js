// local host endpoint from .env
const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST
const api = "api/"

// authentication urls
export const authLogin = `${backendHost}${api}auth/login`
export const authRegister = `${backendHost}${api}auth/register`
export const authLogout = `${backendHost}${api}auth/logout`


//
export const interestLists = `${backendHost}${api}interest-lists/`
