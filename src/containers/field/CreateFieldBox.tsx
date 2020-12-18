import React from "react";
import { useTranslation } from "react-i18next";

import { FieldForm } from "../../components/forms";

export const CreateFieldBox = () => {
  const { t } = useTranslation();
  return (
    <div>
      <FieldForm
        title={t("form.fieldForm.createTitle")}
        actionTitle={t("action.create")}
        mode="create"
      />
    </div>
  );
};
