export const finish = (string: string, end: string) =>
  string.endsWith(end) ? string : `${string}${end}`
export const finishSlash = (string: string) => finish(string, '/')

// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signout`
const check = (baseUrl: string) => `${finishSlash(baseUrl)}auth/check`
// USERS ROUTES
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}users`
// PROJECTS ROUTES
const createProject = (baseUrl: string) => `${finishSlash(baseUrl)}projects`
const updateProject = (baseUrl: string, projectId: string) =>
  `${finishSlash(baseUrl)}projects/${projectId}`
const getProject = (baseUrl: string, projectId: string) =>
  `${finishSlash(baseUrl)}projects/${projectId}`
const getProjects = (baseUrl: string) => `${finishSlash(baseUrl)}projects`


export default {
  // AUTH ROUTES
  signIn,
  signOut,
  check,
  // USERS ROUTES
  signUp,
  // PROJECTS ROUTES
  createProject,
  updateProject,
  getProject,
  getProjects,
}
