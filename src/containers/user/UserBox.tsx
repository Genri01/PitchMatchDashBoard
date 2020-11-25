import React from "react";
import { useParams } from "react-router-dom";
import { UserCard } from "../../components";
import { UserStats, useUserStatsQuery } from "../../generated/apolloComponents";

export interface IUserLocationParams {
  id: string;
}

export const UserBox = () => {
  const { id } = useParams<IUserLocationParams>();
  const { data } = useUserStatsQuery({ variables: { id } });
  const user = (data?.getUserStats || {}) as UserStats;

  return (
    <div>
      <UserCard data={user} />
    </div>
  );
};
