export const finish = (string: string, end: string) =>
  string.endsWith(end) ? string : `${string}${end}`
export const finishSlash = (string: string) => finish(string, '/')

// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signout`
const check = (baseUrl: string) => `${finishSlash(baseUrl)}auth/check`
// USERS ROUTES
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}users`
// COMPANIES ROUTES
const createCompany = (baseUrl: string) => `${finishSlash(baseUrl)}companies`
const updateCompany = (baseUrl: string, companyId: string) =>
  `${finishSlash(baseUrl)}companies/${companyId}`
const uploadCompanyImage = (baseUrl: string, companyId: string) =>
  `${finishSlash(baseUrl)}companies/${companyId}/image`
const getCompany = (baseUrl: string, companyId: string) =>
  `${finishSlash(baseUrl)}companies/${companyId}`
const getUserCompany = (baseUrl: string) =>
  `${finishSlash(baseUrl)}companies/company-by-user`
// BRANCHES ROUTES
const createBranch = (baseUrl: string) => `${finishSlash(baseUrl)}branches`
const uploadBranchImage = (baseUrl: string, branchId: string) =>
  `${finishSlash(baseUrl)}branches/${branchId}/image`
const updateBranch = (baseUrl: string, branchId: string) =>
  `${finishSlash(baseUrl)}branches/${branchId}`
const getBranch = (baseUrl: string, branchId: string) =>
  `${finishSlash(baseUrl)}branches/${branchId}`
const getBranches = (baseUrl: string) => `${finishSlash(baseUrl)}branches`
const getBranchesList = (baseUrl: string) =>
  `${finishSlash(baseUrl)}branches/list`
// POS ROUTES
const createPos = (baseUrl: string) => `${finishSlash(baseUrl)}pos`
const getPos = (baseUrl: string) => `${finishSlash(baseUrl)}pos`
const getPosById = (baseUrl: string, posId: string) =>
  `${finishSlash(baseUrl)}pos/find/${posId}`
const getPosList = (baseUrl: string, branchId: string) =>
  `${finishSlash(baseUrl)}pos/${branchId}/list`
const getOnePos = (baseUrl: string, branchId: string, posId: string) =>
  `${finishSlash(baseUrl)}pos/${branchId}/${posId}`
const updatePos = (baseUrl: string, posId: string) =>
  `${finishSlash(baseUrl)}pos/${posId}`

// SELLERS ROUTES
const getSellers = (baseUrl: string) => `${finishSlash(baseUrl)}sellers`
const getSellerById = (baseUrl: string, sellerId: string) =>
  `${finishSlash(baseUrl)}sellers/${sellerId}`
const createSeller = (baseUrl: string) => `${finishSlash(baseUrl)}sellers`
const updateSeller = (baseUrl: string, sellerId: string) =>
  `${finishSlash(baseUrl)}sellers/${sellerId}`
const updateSellerPos = (baseUrl: string, sellerId: string) =>
  `${finishSlash(baseUrl)}sellers/${sellerId}/update-pos`

// PROVIDERS ROUTES
const createProvider = (baseUrl: string) => `${finishSlash(baseUrl)}providers`
const getProviders = (baseUrl: string) => `${finishSlash(baseUrl)}providers`
const getProviderById = (baseUrl: string, providerId: string) =>
  `${finishSlash(baseUrl)}providers/${providerId}`
const updateProvider = (baseUrl: string, providerId: string) =>
  `${finishSlash(baseUrl)}providers/${providerId}`

export default {
  // AUTH ROUTES
  signIn,
  signOut,
  check,
  // USERS ROUTES
  signUp,
  // COMPANIES ROUTES
  createCompany,
  updateCompany,
  uploadCompanyImage,
  getCompany,
  getUserCompany,
  // BRANCHES ROUTES
  createBranch,
  uploadBranchImage,
  updateBranch,
  getBranch,
  getBranches,
  getBranchesList,
  // POS ROUTES
  createPos,
  getPos,
  getPosById,
  getPosList,
  getOnePos,
  updatePos,
  // SELLERS ROUTES
  getSellers,
  getSellerById,
  createSeller,
  updateSeller,
  updateSellerPos,
  // PROVIDERS ROUTES
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
}
