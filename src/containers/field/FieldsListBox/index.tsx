import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Table } from "../../../components";
import { useTableLocationParams } from "../../../components/Table/useTableLocationParams";
import { FieldsMap } from "../../../components/UI";
import { Place, useFieldsQuery } from "../../../generated/apolloComponents";
import { useStyles } from "./style";
import { TablePlace, useFieldsListBox } from "./useFieldsListBox";

export const FieldsListBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells } = useFieldsListBox();
  const classes = useStyles();
  const history = useHistory();

  const { data } = useFieldsQuery({
    variables: { filter: {} },
    errorPolicy: "ignore",
  });
  const dataRows = (data?.getPlaces?.rows || []) as Place[];
  const fields = (data?.getPlaces?.rows?.filter((el) => !!el) ||
    []) as TablePlace[];

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
