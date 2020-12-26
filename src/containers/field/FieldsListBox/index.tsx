import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Table } from "../../../components";
import { useTableLocationParams } from "../../../components/Table/useTableLocationParams";
import { FieldsMap } from "../../../components/UI";

import { useStyles } from "./style";
import { useFieldsListBox } from "./useFieldsListBox";

export const FieldsListBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells, dataRows, fields } = useFieldsListBox();
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <FieldsMap
        fields={dataRows}
        withClusters={true}
        containerClass={classes.mapContainer}
        onChoose={(f) => history.push(`/field/${f.id}`)}
      />
      <Table
        title={t("table.fields")}
        data={fields}
        headCells={headCells}
        routeBasename="fields"
        pageNum={pageNum}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};
