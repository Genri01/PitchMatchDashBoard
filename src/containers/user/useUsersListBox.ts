import { useTranslation } from "react-i18next";
import { HeadCell } from "../../components";

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
  const headCells: HeadCell<TableUser>[] = [
    {
      id: "id",
      primaryKey: true,
      label: t("user.fields.id"),
    },
    {
      id: "profilePic",
      label: "Picture",
      isImage: true,
    },
    {
      id: "name",
      exportable: true,
      isItemLink: true,
      linkFormatter: (el: TableUser) => `/user/${el.id}`,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) => el?.name || "",
      label: t("user.fields.name"),
    },
    {
      id: "attendGames",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) =>
        el?.attendGames ? el.attendGames.toString() : "",
      label: t("user.fields.attendGames"),
    },
    {
      id: "orgGames",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) =>
        el?.orgGames ? el.orgGames.toString() : "",
      label: t("user.fields.orgGames"),
    },
    {
      id: "birthday",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) => el?.birthday || "",
      label: t("user.fields.birthday"),
    },
    {
      id: "email",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) => el?.email || "",
      label: t("user.fields.email"),
    },
    {
      id: "phone",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) => el?.phone || "",
      label: t("user.fields.phoneNumber"),
    },
    {
      id: "gender",
      exportable: true,
      withSeparateSearch: true,
      valueGetter: (el: TableUser) => el?.gender || "",
      label: t("user.fields.gender"),
    },
  ];

  return {
    headCells,
  };
};
