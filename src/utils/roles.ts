import { User } from "../generated/apolloComponents";

type RolesUser = User | null;

const ADMIN = "admin";
const MODERATOR = "moderator";
const MANAGER = "manager";
const USER = "user";

export const ROLES = {
  isManager: (u: RolesUser) => u?.role == MANAGER,
  shouldBeDisplayed: {
    user: {
      id: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      profilePic: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      name: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      attendGames: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      orgGames: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      gender: (u: RolesUser) =>
        u?.role && [MANAGER, MODERATOR, ADMIN].includes(u.role),
      birthday: (u: RolesUser) =>
        u?.role && [MODERATOR, ADMIN].includes(u.role),
      email: (u: RolesUser) => u?.role && [MODERATOR, ADMIN].includes(u.role),
      phone: (u: RolesUser) => u?.role && [MODERATOR, ADMIN].includes(u.role),
    },
    menu: {
      accessSection: (u: RolesUser) =>
        u?.role && [MODERATOR, ADMIN].includes(u.role),
    },
  },
  ADMIN,
  MODERATOR,
  MANAGER,
  USER,
};
