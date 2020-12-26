import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { MAP } from "../../../constants";
import { UserContext } from "../../../contexts";
import {
  Place,
  PlaceInput,
  useUpsertFieldMutation,
  // File as GqlFile,
} from "../../../generated/apolloComponents";
import { LatLng } from "../../UI/MarkerMap";

import { FieldQuery } from "../../../graphql/field/queries/field";
import { blobToFile } from "../../UI";

export type FieldFormMode = "create" | "edit";

export interface UseFieldFormProps {
  mode?: FieldFormMode;
  existingData?: Place;
}

export const useFieldForm = ({ existingData: ed }: UseFieldFormProps) => {
  const history = useHistory();

  const { handleSubmit, register, watch, formState, errors } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      ...ed,
      fromTime: ed?.fromTime ? format(new Date(ed.fromTime), "HH:mm") : "",
      toTime: ed?.toTime ? format(new Date(ed.toTime), "HH:mm") : "",
    },
  });
  const [serverError, setServerError] = useState<any>();
  const [existingImages, setExistingImages] = useState<File[]>();

  const { me } = useContext(UserContext);
  const [upsertField] = useUpsertFieldMutation();
  const [pos, setPos] = useState<LatLng>(
    ed?.point?.location
      ? {
          lat: ed.point.location.coordinates[0],
          lng: ed.point.location.coordinates[1],
        }
      : MAP.DEFAULT_POS
  );
  const [images, setImages] = useState();

  const onSubmit = async (data: PlaceInput) => {
    try {
      const { lat, lng } = pos;

      const input = {
        ...data,
        price:
          data.price && typeof data.price == "string"
            ? parseFloat(data.price)
            : 0,
        fromTime: new Date(`2020-12-11T${data.fromTime}`),
        toTime: new Date(`2020-12-11T${data.toTime}`),
        userId: me!.id,
        location: [lat, lng],
        visitType: "public",
      };
      if (images) input.filesToAdd = images;

      const res = await upsertField({
        variables: { input, id: ed?.id },
        refetchQueries: ed?.id
          ? [{ query: FieldQuery, variables: { id: ed.id } }]
          : [],
      });
      const resId = res.data?.upsertPlace?.id;

      if (resId) {
        history.push(`/field/${resId}`);
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  const fetchExistingImages = async (urls: string[]) =>
    await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => blobToFile(blob, url))
      )
    );

  const initiateExistingImages = async () => {
    const imgs = await fetchExistingImages([
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg",
    ]);
    setExistingImages(imgs);
  };

  useEffect(() => {
    initiateExistingImages();
  }, []);

  return {
    register,
    onSubmit: handleSubmit<PlaceInput>(onSubmit),
    pos,
    setPos,
    setImages,
    watch,
    serverError,
    setServerError,
    errors,
    formState,
    existingFiles: existingImages,
  };
};
