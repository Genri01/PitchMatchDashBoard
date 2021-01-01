import { User } from "../generated/apolloComponents";

type RolesUser = User | null;

const ADMIN = "admin";
const MODERATOR = "support";
const MANAGER = "manager";
const USER = "user";

export const ROLES = {
  isManager: (u: RolesUser) => u?.role == MANAGER,
  getSubRoles: (u: RolesUser) => {
    if (!u?.role) return [];

    switch (u.role) {
      case ADMIN:
        return [MODERATOR, MANAGER, USER];
      case MODERATOR:
        return [MANAGER, USER];
      case MODERATOR:
        return [USER];

      default:
        return [];
    }
  },
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
      hasBookings: (u: RolesUser) => u?.role && [MANAGER].includes(u.role),
      secretInfo: (u: RolesUser, hasBookings: boolean) => {
        if (!u?.role) return false;
        if (MANAGER == u.role) {
          return hasBookings;
        }
        return [MODERATOR, ADMIN].includes(u.role);
      },
    },
    accesses: {
      makeModerator: (u: RolesUser) => u?.role && [ADMIN].includes(u.role),
      makeManager: (u: RolesUser) =>
        u?.role && [MODERATOR, ADMIN].includes(u.role),
      makeUser: (u: RolesUser) =>
        u?.role && [MODERATOR, ADMIN].includes(u.role),
      banUser: (user: RolesUser, me: RolesUser) => {
        if (!me?.role || !user?.role) return false;

        switch (me.role) {
          case ADMIN:
            return true;
          case MODERATOR:
            return [MANAGER, USER].includes(user.role);

          default:
            return false;
        }
      },
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
