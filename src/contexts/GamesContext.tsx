import React, { useContext } from "react";
import { createContext, FC } from "react";
import { Game, useGamesQuery } from "../generated/apolloComponents";
import { ROLES } from "../utils";
import { UserContext } from "./UserContext";

interface GamesContextInterface {
  games: Game[];
  refetchGames: Function;
}

export const GamesContext = createContext<GamesContextInterface>(
  {} as GamesContextInterface
);

export const GamesContextProvider: FC = ({ children }) => {
  const { me } = useContext(UserContext);
  const { data, refetch } = useGamesQuery({
    variables: {
      filter: {
        startDate: new Date().toString(),
        ...(ROLES.isManager(me) ? { userId: me?.id } : {}),
      },
    },
    errorPolicy: "ignore",
  });

  const games = (data?.getGames?.rows?.filter((el) => !!el) || []) as Game[];

  return (
    <GamesContext.Provider value={{ games, refetchGames: refetch }}>
      {children}
    </GamesContext.Provider>
  );
};
