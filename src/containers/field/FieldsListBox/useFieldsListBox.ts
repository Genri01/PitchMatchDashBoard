import { format } from "date-fns";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { HeadCell } from "../../../components";
import { UserContext } from "../../../contexts/UserContext";
import { Place, useFieldsQuery } from "../../../generated/apolloComponents";
import { ROLES } from "../../../utils";

export interface TablePlace {
  id: string;
  name: string;
  description: string;
  address: string;
  roof: boolean;
  price: number;
  fromTime: Date;
  toTime: Date;
  workingHours: string;
}

export const useFieldsListBox = () => {
  const { t } = useTranslation();
  const { me } = useContext(UserContext);
  const { data } = useFieldsQuery({
    variables: { filter: ROLES.isManager(me) ? { userId: me!.id } : {} },
    errorPolicy: "ignore",
  });
  const dataRows = (data?.getPlaces?.rows || []) as Place[];
  const fields = (data?.getPlaces?.rows?.filter((el) => !!el) ||
    []) as TablePlace[];

  const headCells: HeadCell<TablePlace>[] = [
    {
      id: "id",
      primaryKey: true,
      label: t("field.fields.id"),
    },
    {
      id: "name",
      exportable: true,
      label: t("field.fields.name"),
      isItemLink: true,
      linkFormatter: (el: TablePlace) => `/field/${el.id}`,
      filter: { type: "search" },
      valueGetter: (el: TablePlace) => el?.name || "",
    },
    {
      id: "description",
      exportable: true,
      label: t("field.fields.description"),
      filter: { type: "search" },
      valueGetter: (el: TablePlace) => el?.description || "",
    },
    {
      id: "address",
      exportable: true,
      label: t("field.fields.address"),
      filter: { type: "search" },
      valueGetter: (el: TablePlace) => el?.address || "",
    },
    {
      id: "roof",
      exportable: true,
      valueGetter: (el: TablePlace) =>
        el.roof ? t("shared.yes") : t("shared.no"),
      filter: {
        type: "select",
        options: [t("shared.yes"), t("shared.no")],
      },
      label: t("field.fields.indoor"),
    },
    {
      id: "workingHours",
      exportable: true,
      valueGetter: (el: TablePlace) =>
        el.fromTime && el.toTime
          ? `${format(new Date(el.fromTime), "hh:mm")} - ${format(
              new Date(el.toTime),
              "hh:mm"
            )}`
          : "",
      filter: {
        type: "numberRange",
      },
      label: t("field.fields.workingHours"),
    },
    {
      id: "price",
      exportable: true,
      label: t("field.fields.price"),
      filter: {
        type: "numberRange",
      },
      valueGetter: (el: TablePlace) =>
        typeof el?.price == "number" ? el.price.toString() : "",
    },
  ];

  return {
    headCells,
    dataRows,
    fields,
  };
};
