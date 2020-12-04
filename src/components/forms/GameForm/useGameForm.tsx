import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { GamesContext } from "../../../contexts";

import {
  GameInput,
  Place,
  useMapFieldsQuery,
  useUpsertGameMutation,
} from "../../../generated/apolloComponents";

export const useGameForm = () => {
  const formMethods = useForm();
  const { handleSubmit, register, control } = formMethods;
  const [upsertGame] = useUpsertGameMutation();
  const history = useHistory();
  const { refetchGames } = useContext(GamesContext);

  const [field, setField] = useState<Place | null>();
  const { data } = useMapFieldsQuery({
    errorPolicy: "ignore",
  });

  const fields = (data?.getPlaces?.rows?.filter((el) => !!el) || []) as Place[];

  const toNum = (str) => (str && typeof str == "string" ? parseFloat(str) : 0);

  const onSubmit = async (data: GameInput) => {
    try {
      const input = {
        ...data,
        price: toNum(data.price),
        ageFrom: toNum(data.ageFrom),
        ageTo: toNum(data.ageTo),
        placeId: field?.id,
        address: field?.address,
      };

      const res = await upsertGame({
        variables: { input },
      });
      const resId = res.data?.upsertGame?.id;
      if (resId) {
        history.push(`/game/${resId}`);
      }
      refetchGames();
    } catch (err) {}
  };

  return {
    register,
    onSubmit: handleSubmit<GameInput>(onSubmit),
    formMethods,
    control,
    fields,
    field,
    setField,
  };
};
