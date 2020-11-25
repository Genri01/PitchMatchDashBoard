import React from "react";
import { HeadCell, Table } from "../../components";
import { useUsersStatsQuery } from "../../generated/apolloComponents";

interface TableUser {
  id: string;
  attendGames: number;
  orgGames: number;
  name: string;
  birthday: string;
  gender: string;
  profilePic: string;
}

const headCells: HeadCell<TableUser>[] = [
  {
    id: "id",
    primaryKey: true,
    label: "Id",
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
    label: "Name",
  },
  {
    id: "attendGames",
    exportable: true,
    withSeparateSearch: true,
    valueGetter: (el: TableUser) =>
      el?.attendGames ? el.attendGames.toString() : "",
    label: "Games attended",
  },
  {
    id: "orgGames",
    exportable: true,
    withSeparateSearch: true,
    valueGetter: (el: TableUser) =>
      el?.orgGames ? el.orgGames.toString() : "",
    label: "Games organised",
  },
  {
    id: "birthday",
    exportable: true,
    withSeparateSearch: true,
    valueGetter: (el: TableUser) => el?.birthday || "",
    label: "Birthday",
  },
  {
    id: "gender",
    exportable: true,
    withSeparateSearch: true,
    valueGetter: (el: TableUser) => el?.gender || "",
    label: "Gender",
  },
];

export const UsersListBox = () => {
  const { data } = useUsersStatsQuery();
  const users = data?.getUsersStats?.rows.map(({ user, ...el }) => ({
    id: el.userId,
    attendGames: el.attendGames,
    orgGames: el.orgGames,
    name: `${user?.lastName || ""} ${user?.firstName || ""}`,
    birthday: user?.birthday ? new Date(user.birthday).toDateString() : "",
    gender: user?.gender,
    profilePic: user?.avatar?.url,
  })) as TableUser[];

  return (
    <div>
      <Table title={"Пользователи"} data={users} headCells={headCells} />
    </div>
  );
};
