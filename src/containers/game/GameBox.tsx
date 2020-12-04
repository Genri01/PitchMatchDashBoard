import React from "react";
import { useParams } from "react-router-dom";
import { GameCard } from "../../components";
import { Game, useGameQuery } from "../../generated/apolloComponents";

export interface IGameLocationParams {
  id: string;
}

export const GameBox = () => {
  const { id } = useParams<IGameLocationParams>();
  const { data } = useGameQuery({ variables: { id } });
  const game = data?.getGame as Game;

  return (
    <div>
      <GameCard data={game} />
    </div>
  );
};
