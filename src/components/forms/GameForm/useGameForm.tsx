import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { GamesContext, UserContext } from "../../../contexts";

import {
  GameInput,
  Place,
  useMapFieldsQuery,
  useUpsertGameMutation,
} from "../../../generated/apolloComponents";
import { ROLES } from "../../../utils";

export const useGameForm = () => {
  const formMethods = useForm({ mode: "onChange" });
  const { handleSubmit, register, control, errors, formState } = formMethods;
  const [upsertGame] = useUpsertGameMutation();
  const history = useHistory();
  const { me } = useContext(UserContext);
  const { refetchGames } = useContext(GamesContext);
  const [serverError, setServerError] = useState<any>();

  const [field, setField] = useState<Place | null>();
  const { data } = useMapFieldsQuery({
    variables: { filter: ROLES.isManager(me) ? { userId: me!.id } : {} },
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
        teamSeparation: "manual",
      };

      const res = await upsertGame({
        variables: { input },
      });
      const resId = res.data?.upsertGame?.id;
      if (resId) {
        history.push(`/game/${resId}`);
      }
      refetchGames();
    } catch (err) {
      if (err?.networkError?.result?.errors) {
        setServerError(err.networkError.result.errors);
      } else {
        console.log("err :>> ", err);
      }
    }
  };

  return {
    register,
    onSubmit: handleSubmit<GameInput>(onSubmit),
    formMethods,
    control,
    fields,
    field,
    setField,
    serverError,
    setServerError,
    errors,
    formState,
  };
};
