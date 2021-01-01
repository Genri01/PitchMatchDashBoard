import { useContext } from "react";
import { UserContext } from "../../contexts";
import {
  User,
  useUpdateUserBanMutation,
} from "../../generated/apolloComponents";

export const useUserCard = () => {
  const [updateUserBan] = useUpdateUserBanMutation();
  const { me } = useContext(UserContext);

  const ban = async (user: User) => {
    try {
      await updateUserBan({
        variables: {
          id: user.id,
          input: { banReason: "", bannedAt: new Date(), bannedById: me!.id },
        },
      });
    } catch (error) {}
  };

  const unban = async (user: User) => {
    try {
      await updateUserBan({
        variables: {
          id: user.id,
          input: { banReason: null, bannedAt: null, bannedById: null },
        },
      });
    } catch (error) {}
  };

  const toggleBan = async (user: User) => {
    if (user.bannedAt) {
      await unban(user);
    } else {
      await ban(user);
    }
  };

  return {
    ban,
    unban,
    toggleBan,
  };
};
