import React from "react";
import { HeadCell, Table } from "../../components";
import { useFieldsQuery } from "../../generated/apolloComponents";

interface TablePlace {
  id: string;
  name: string;
  description: string;
  address: string;
  roof: boolean;
  price: number;
}

const headCells: HeadCell<TablePlace>[] = [
  {
    id: "id",
    primaryKey: true,
    label: "Id",
  },
  {
    id: "name",
    exportable: true,
    label: "Название",
    isItemLink: true,
    linkFormatter: (el: TablePlace) => `/field/${el.id}`,
    withSeparateSearch: true,
    valueGetter: (el: TablePlace) => el?.name || "",
  },
  {
    id: "description",
    exportable: true,
    label: "Описание",
    withSeparateSearch: true,
    valueGetter: (el: TablePlace) => el?.description || "",
  },
  {
    id: "address",
    exportable: true,
    label: "Адрес",
    withSeparateSearch: true,
    valueGetter: (el: TablePlace) => el?.address || "",
  },
  {
    id: "roof",
    exportable: true,
    valueGetter: (el: TablePlace) => (el.roof ? "Да" : "Нет"),
    label: "Крытое/открытое",
  },
  {
    id: "price",
    exportable: true,
    label: "Цена",
    withSeparateSearch: true,
    valueGetter: (el: TablePlace) =>
      typeof el?.price == "number" ? el.price.toString() : "",
  },
];

export const FieldsListBox = () => {
  const { data } = useFieldsQuery({
    variables: { filter: {} },
    errorPolicy: "ignore",
  });
  const fields = (data?.getPlaces?.rows?.filter((el) => !!el) ||
    []) as TablePlace[];

  return (
    <div>
      <Table title={"Поля"} data={fields} headCells={headCells} />
    </div>
  );
};
