import React from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import { useTableLocationParams } from "../../components/Table/useTableLocationParams";
import { useUsersStatsQuery } from "../../generated/apolloComponents";
import { TableUser, useUsersListBox } from "./useUsersListBox";

export const UsersListBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells } = useUsersListBox();

  const { data } = useUsersStatsQuery();
  const users = data?.getUsersStats?.rows.map(({ user, ...el }) => ({
    id: el.userId,
    attendGames: el.attendGames,
    orgGames: el.orgGames,
    name: `${user?.lastName || ""} ${user?.firstName || ""}`,
    birthday: user?.birthday ? new Date(user.birthday).toDateString() : "",
    gender: user?.gender,
    phone: user?.phone,
    email: user?.email,
    profilePic: user?.avatar?.url,
  })) as TableUser[];

  return (
    <div>
      <Table
        title={t("table.users")}
        data={users}
        headCells={headCells}
        routeBasename="users"
        pageNum={pageNum}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};
