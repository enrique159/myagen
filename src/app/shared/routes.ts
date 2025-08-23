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
// ELEMENTS ROUTES
const createElement = (baseUrl: string) => `${finishSlash(baseUrl)}elements`
const updateElement = (baseUrl: string, elementId: string) =>
  `${finishSlash(baseUrl)}elements/${elementId}`
const getElement = (baseUrl: string, elementId: string) =>
  `${finishSlash(baseUrl)}elements/${elementId}`
const getElements = (baseUrl: string) => `${finishSlash(baseUrl)}elements`
const deleteElement = (baseUrl: string, elementId: string) =>
  `${finishSlash(baseUrl)}elements/${elementId}`
const addTags = (baseUrl: string, elementId: string) =>
  `${finishSlash(baseUrl)}elements/${elementId}/tags`
const removeTags = (baseUrl: string, elementId: string) =>
  `${finishSlash(baseUrl)}elements/${elementId}/tags`
// TAGS ROUTES
const createTag = (baseUrl: string) => `${finishSlash(baseUrl)}tags`
const updateTag = (baseUrl: string, tagId: string) =>
  `${finishSlash(baseUrl)}tags/${tagId}`
const getTags = (baseUrl: string) => `${finishSlash(baseUrl)}tags`
const deleteTag = (baseUrl: string, tagId: string) =>
  `${finishSlash(baseUrl)}tags/${tagId}`


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
  // ELEMENTS ROUTES
  createElement,
  updateElement,
  getElement,
  getElements,
  deleteElement,
  addTags,
  removeTags,
  // TAGS ROUTES
  createTag,
  updateTag,
  getTags,
  deleteTag,
}
