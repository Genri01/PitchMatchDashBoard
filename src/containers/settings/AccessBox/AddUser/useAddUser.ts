import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../contexts";
import {
  UserProfile,
  useUsersStatsQuery,
} from "../../../../generated/apolloComponents";
import { ROLES } from "../../../../utils";
import { useAccessBox } from "../useAccessTable";

interface AddUserInput {
  role: string;
}

export const useAddUser = (onAdd?: Function) => {
  const formMethods = useForm({ mode: "onChange" });
  const { handleSubmit, register, formState } = formMethods;
  const { updateRole } = useAccessBox();
  const { me } = useContext(UserContext);
  const availableRoles = ROLES.getSubRoles(me);
  const { data } = useUsersStatsQuery({
    variables: { filter: { role: [ROLES.USER] } },
  });
  const users = data?.getUsersStats?.rows.map((el) => el.user) || [];

  const [user, setUser] = useState<UserProfile>();
  const [userSearch, setUserSearch] = useState("");

  const onSubmit = async (data: AddUserInput) => {
    try {
      await updateRole(user!.id, data.role);
      setUser(null as any);
      setUserSearch("");
      onAdd && onAdd();
    } catch (error) {}
  };

  return {
    onSubmit: handleSubmit<AddUserInput>(onSubmit),
    formMethods,
    register,
    users,
    formState,
    user,
    availableRoles,
    setUser,
    userSearch,
    setUserSearch,
  };
};
