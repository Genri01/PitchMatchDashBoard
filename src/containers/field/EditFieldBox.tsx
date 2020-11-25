import React from "react";
import { useParams } from "react-router-dom";
import { IFieldLocationParams } from ".";
import { FieldForm } from "../../components/forms";
import { useFieldQuery, Place } from "../../generated/apolloComponents";
import EditIcon from "@material-ui/icons/Edit";

export const EditFieldBox = () => {
  const { id } = useParams<IFieldLocationParams>();
  const { data } = useFieldQuery({ variables: { id } });
  const field = data?.getPlace as Place;

  return (
    <div>
      <div>
        <FieldForm
          title="Изменить поле"
          actionTitle="Изменить"
          icon={<EditIcon />}
          mode="edit"
          existingData={field}
        />
      </div>
    </div>
  );
};
