export const UserRole = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
});

// all user
export const isAnyUser = (role) =>
  role === UserRole.USER ||
  role === UserRole.ADMIN ||
  role === UserRole.SUPER_ADMIN;

// admin users
export const isAnyAdmin = (role) =>
  role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;

// single user
export const isSuperAdmin = (role) => role === UserRole.SUPER_ADMIN;
export const isAdmin = (role) => role === UserRole.ADMIN;
export const isUser = (role) => role === UserRole.USER;

// user sets
export const getHomePathByRole = (role) => {
  if (isSuperAdmin(role) || isAdmin(role)) return "/admin/dashboard";
  if (isUser(role)) return "/";
  return "/";
};
