import React from "react";
import { useParams } from "react-router-dom";
import { FieldCard } from "../../components/FieldCard";
import { Place, useFieldQuery } from "../../generated/apolloComponents";

export interface IFieldLocationParams {
  id: string;
}

export const FieldBox = () => {
  const { id } = useParams<IFieldLocationParams>();
  const { data } = useFieldQuery({ variables: { id } });
  const field = data?.getPlace as Place;

  return (
    <div>
      <FieldCard data={field} />
    </div>
  );
};

