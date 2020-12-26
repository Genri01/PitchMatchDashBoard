import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { HeadCell } from "../../components";
import { UserContext } from "../../contexts";
import { ROLES } from "../../utils";

export interface TableUser {
  id: string;
  attendGames: number;
  orgGames: number;
  name: string;
  birthday: string;
  gender: string;
  profilePic: string;
  email: string;
  phone: string;
}

export const useUsersListBox = () => {
  const { t } = useTranslation();
  const { me } = useContext(UserContext);

  const headCells: HeadCell<TableUser>[] = [
    {
      id: "id",
      primaryKey: true,
      label: t("user.fields.id"),
    },
    {
      id: "profilePic",
      isImage: true,
      label: t("user.fields.picture"),
    },
    {
      id: "name",
      exportable: true,
      isItemLink: true,
      linkFormatter: (el: TableUser) => `/user/${el.id}`,
      filter: { type: "search" },
      valueGetter: (el: TableUser) => el?.name || "",
      label: t("user.fields.name"),
    },
    {
      id: "attendGames",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: TableUser) =>
        el?.attendGames ? el.attendGames.toString() : "",
      label: t("user.fields.attendGames"),
    },
    {
      id: "orgGames",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: TableUser) =>
        el?.orgGames ? el.orgGames.toString() : "",
      label: t("user.fields.orgGames"),
    },
    {
      id: "birthday",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: TableUser) => el?.birthday || "",
      label: t("user.fields.birthday"),
    },
    {
      id: "email",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: TableUser) => el?.email || "",
      label: t("user.fields.email"),
    },
    {
      id: "phone",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: TableUser) => el?.phone || "",
      label: t("user.fields.phoneNumber"),
    },
    {
      id: "gender",
      exportable: true,
      filter: {
        type: "select",
        options: [t("user.fields.maleShort"), t("user.fields.femaleShort")],
      },
      valueGetter: (el: TableUser) =>
        el?.gender == "m"
          ? t("user.fields.maleShort")
          : el?.gender == "f"
          ? t("user.fields.femaleShort")
          : "",
      label: t("user.fields.gender"),
    },
  ];

  const premittedHeadCells = headCells.filter((el) =>
    ROLES.shouldBeDisplayed.user[el.id](me)
  );

  return {
    headCells: premittedHeadCells,
  };
};
