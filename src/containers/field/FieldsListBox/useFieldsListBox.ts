import { useTranslation } from "react-i18next";
import { HeadCell } from "../../../components";

export interface TablePlace {
  id: string;
  name: string;
  description: string;
  address: string;
  roof: boolean;
  price: number;
}

export const useFieldsListBox = () => {
  const { t } = useTranslation();
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
      withSeparateSearch: true,
      valueGetter: (el: TablePlace) => el?.name || "",
    },
    {
      id: "description",
      exportable: true,
      label: t("field.fields.description"),
      withSeparateSearch: true,
      valueGetter: (el: TablePlace) => el?.description || "",
    },
    {
      id: "address",
      exportable: true,
      label: t("field.fields.address"),
      withSeparateSearch: true,
      valueGetter: (el: TablePlace) => el?.address || "",
    },
    {
      id: "roof",
      exportable: true,
      valueGetter: (el: TablePlace) => (el.roof ? "Да" : "Нет"),
      label: t("field.fields.indoor"),
    },
    {
      id: "price",
      exportable: true,
      label: t("field.fields.price"),
      withSeparateSearch: true,
      valueGetter: (el: TablePlace) =>
        typeof el?.price == "number" ? el.price.toString() : "",
    },
  ];

  return {
    headCells,
  };
};
