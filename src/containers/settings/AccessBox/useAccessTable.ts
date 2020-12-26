import { useTranslation } from "react-i18next";
import { HeadCell } from "../../../components";
import { getRoleTitles } from "../../../constants";
import { useUpdateUserRoleMutation } from "../../../generated/apolloComponents";
import { usersStatsQuery } from "../../../graphql/user/queries/usersStats";

export interface AccessTableUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export const useAccessBox = () => {
  const { t } = useTranslation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const updateRole = async (userId: string, role: string) => {
    try {
      await updateUserRole({
        variables: { userId, role },
        refetchQueries: [{ query: usersStatsQuery }],
      });
    } catch (error) {}
  };

  const headCells: HeadCell<AccessTableUser>[] = [
    {
      id: "id",
      primaryKey: true,
      label: t("user.fields.id"),
    },
    {
      id: "name",
      exportable: true,
      isItemLink: true,
      linkFormatter: (el: AccessTableUser) => `/user/${el.id}`,
      filter: { type: "search" },
      valueGetter: (el: AccessTableUser) => el?.name || "",
      label: t("user.fields.name"),
    },
    {
      id: "email",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: AccessTableUser) => el?.email || "",
      label: t("user.fields.email"),
    },
    {
      id: "phone",
      exportable: true,
      filter: { type: "search" },
      valueGetter: (el: AccessTableUser) => el?.phone || "",
      label: t("user.fields.phoneNumber"),
    },
    {
      id: "role",
      exportable: true,
      filter: { type: "select", options: getRoleTitles() },
      valueGetter: (el: AccessTableUser) => el?.role || "",
      label: t("user.fields.role"),
    },
  ];

  return {
    headCells,
    updateRole,
  };
};
