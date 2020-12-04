import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GamesContext } from "../../contexts";
import { Game, useUpsertGameMutation } from "../../generated/apolloComponents";

export const useGameCard = (game: Game) => {
  const [upsertGame] = useUpsertGameMutation();
  const history = useHistory();

  const { refetchGames } = useContext(GamesContext);

  const accept = async () => {
    try {
      await upsertGame({
        variables: { id: game.id, input: { status: "confirmed" } },
      });
      history.push("/games");
      refetchGames();
    } catch (error) {}
  };

  const decline = async () => {
    try {
      await upsertGame({
        variables: { id: game.id, input: { status: "cancelled" } },
      });
      history.push("/games");
      refetchGames();
    } catch (error) {}
  };

  return {
    accept,
    decline,
  };
};
