import i18next from "i18next";
import { ROLES } from "../utils";

export const getRoleTitles = () => [
  i18next.t("shared.role.admin"),
  i18next.t("shared.role.support"),
  i18next.t("shared.role.manager"),
  i18next.t("shared.role.user"),
];

export const getRoleTitle = (role: string) => {
  switch (role) {
    case ROLES.ADMIN:
      return i18next.t("shared.role.admin");
    case ROLES.MODERATOR:
      return i18next.t("shared.role.support");
    case ROLES.MANAGER:
      return i18next.t("shared.role.manager");
    case ROLES.USER:
      return i18next.t("shared.role.user");

    default:
      return "";
  }
};
