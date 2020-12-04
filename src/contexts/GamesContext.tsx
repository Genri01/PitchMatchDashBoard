import React from "react";
import { createContext, FC } from "react";
import { Game, useGamesQuery } from "../generated/apolloComponents";

interface GamesContextInterface {
  games: Game[];
  refetchGames: Function;
}

export const GamesContext = createContext<GamesContextInterface>(
  {} as GamesContextInterface
);

export const GamesContextProvider: FC = ({ children }) => {
  const { data, refetch } = useGamesQuery({
    variables: { filter: { startDate: new Date().toString() } },
    errorPolicy: "ignore",
  });

  const games = (data?.getGames?.rows?.filter((el) => !!el) || []) as Game[];

  return (
    <GamesContext.Provider value={{ games, refetchGames: refetch }}>
      {children}
    </GamesContext.Provider>
  );
};
