import { format } from "date-fns";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import { useTableLocationParams } from "../../components/Table/useTableLocationParams";
import { UserContext } from "../../contexts";
import {
  useFieldsQuery,
  useUsersStatsQuery,
} from "../../generated/apolloComponents";
import { ROLES } from "../../utils";
import { TableUser, useUsersListBox } from "./useUsersListBox";

export const UsersListBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells } = useUsersListBox();
  const { me } = useContext(UserContext);

  const { data: fieldsData } = useFieldsQuery({
    variables: { filter: ROLES.isManager(me) ? { userId: me!.id } : {} },
    errorPolicy: "ignore",
  });
  const placeIds = (fieldsData?.getPlaces?.rows
    ?.map((el) => el?.id)
    ?.filter((el) => !!el) || []) as string[];

  const { data } = useUsersStatsQuery({
    variables: {
      filter: {
        ...(ROLES.isManager(me) ? { placeIds } : {}),
      },
    },
  });

  const users = data?.getUsersStats?.rows.map(({ user, games, ...el }) => ({
    id: el.userId,
    attendGames: el.attendGames,
    orgGames: el.orgGames,
    name: `${user?.lastName || ""} ${user?.firstName || ""}`,
    birthday: user?.birthday
      ? format(new Date(user?.birthday), "yyyy-MM-dd")
      : "",
    gender: user?.gender,
    phone: user?.phone,
    email: user?.email,
    profilePic: user?.avatar?.url,
    hasBookings: !!games?.length,
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
