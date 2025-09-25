export const finish = (string: string, end: string) =>
  string.endsWith(end) ? string : `${string}${end}`
export const finishSlash = (string: string) => finish(string, '/')

// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signout`
const sendRecoveryPasswordEmail = (baseUrl: string) => `${finishSlash(baseUrl)}auth/send-recovery-password-email`
const recoverPassword = (baseUrl: string) => `${finishSlash(baseUrl)}auth/recover-password`
const check = (baseUrl: string) => `${finishSlash(baseUrl)}auth/check`
// USERS ROUTES
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}users`
const updateUser = (baseUrl: string) => `${finishSlash(baseUrl)}users`
const uploadImage = (baseUrl: string) => `${finishSlash(baseUrl)}users/upload-image`
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
const searchElements = (baseUrl: string) => `${finishSlash(baseUrl)}elements/search`
const calendarElements = (baseUrl: string) => `${finishSlash(baseUrl)}elements/calendar`
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
// TODO-LISTS ROUTES
const createList = (baseUrl: string) => `${finishSlash(baseUrl)}todo-lists`
const updateList = (baseUrl: string, listId: string) => `${finishSlash(baseUrl)}todo-lists/${listId}`
const deleteList = (baseUrl: string, listId: string) => `${finishSlash(baseUrl)}todo-lists/${listId}`
// TASKS ROUTES
const createTask = (baseUrl: string) => `${finishSlash(baseUrl)}tasks`
const updateTask = (baseUrl: string, taskId: string) => `${finishSlash(baseUrl)}tasks/${taskId}`
const deleteTask = (baseUrl: string, taskId: string) => `${finishSlash(baseUrl)}tasks/${taskId}`
// REMINDERS ROUTES
const createReminder = (baseUrl: string) => `${finishSlash(baseUrl)}reminders`
const updateReminder = (baseUrl: string, reminderId: string) => `${finishSlash(baseUrl)}reminders/${reminderId}`
const deleteReminder = (baseUrl: string, reminderId: string) => `${finishSlash(baseUrl)}reminders/${reminderId}`
const getReminders = (baseUrl: string) => `${finishSlash(baseUrl)}reminders/user/date-range`

export default {
  // AUTH ROUTES
  signIn,
  signOut,
  sendRecoveryPasswordEmail,
  recoverPassword,
  check,
  // USERS ROUTES
  signUp,
  updateUser,
  uploadImage,
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
  searchElements,
  deleteElement,
  calendarElements,
  addTags,
  removeTags,
  // TAGS ROUTES
  createTag,
  updateTag,
  getTags,
  deleteTag,
  // TODO-LISTS ROUTES
  createList,
  updateList,
  deleteList,
  // TASKS ROUTES
  createTask,
  updateTask,
  deleteTask,
  // REMINDERS ROUTES
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
}
