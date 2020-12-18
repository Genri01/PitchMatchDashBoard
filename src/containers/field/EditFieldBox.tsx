import React from "react";
import { useParams } from "react-router-dom";
import { IFieldLocationParams } from ".";
import { FieldForm } from "../../components/forms";
import { useFieldQuery, Place } from "../../generated/apolloComponents";
import EditIcon from "@material-ui/icons/Edit";
import { useTranslation } from "react-i18next";

export const EditFieldBox = () => {
  const { t } = useTranslation();

  const { id } = useParams<IFieldLocationParams>();
  const { data } = useFieldQuery({ variables: { id } });
  const field = data?.getPlace as Place;

  return (
    <div>
      <div>
        <FieldForm
          title={t("form.fieldForm.editTitle")}
          actionTitle={t("action.edit")}
          icon={<EditIcon />}
          mode="edit"
          existingData={field}
        />
      </div>
    </div>
  );
};
