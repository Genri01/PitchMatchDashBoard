import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Table } from "../../../components";
import { useTableLocationParams } from "../../../components/Table/useTableLocationParams";
import { getRoleTitle } from "../../../constants";
import { useUsersStatsQuery } from "../../../generated/apolloComponents";
import { AccessTableUser, useAccessBox } from "./useAccessTable";
import { ROLES } from "../../../utils";

interface RoleActionsItemProps {
  id: string;
}

const RoleActionsItem: FC<RoleActionsItemProps> = ({ id }) => {
  const { t } = useTranslation();
  const { updateRole } = useAccessBox();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            updateRole(id, ROLES.MODERATOR);
          }}
        >
          {t("action.role.makeModerator")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            updateRole(id, ROLES.MANAGER);
          }}
        >
          {t("action.role.makeManager")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            updateRole(id, ROLES.USER);
          }}
        >
          {t("action.role.makeUser")}
        </MenuItem>
      </Menu>
    </div>
  );
};

export const AccessBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells } = useAccessBox();

  const { data } = useUsersStatsQuery({ variables: { }});
  const users = data?.getUsersStats?.rows.map(({ user, ...el }) => ({
    id: el.userId,
    name: `${user?.lastName || ""} ${user?.firstName || ""}`,
    phone: user?.phone,
    email: user?.email,
    role: getRoleTitle(user?.role || ""),
  })) as AccessTableUser[];

  return (
    <div>
      <Table
        title={t("table.users")}
        data={users}
        headCells={headCells}
        routeBasename="access"
        pageNum={pageNum}
        rowsPerPage={rowsPerPage}
        actionsOptions={{
          columnTitle: "Actions",
          actionItem: (id: string) => <RoleActionsItem id={id} />,
        }}
      />
    </div>
  );
};
