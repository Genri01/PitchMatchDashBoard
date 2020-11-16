import React from "react";
import { HeadCell, Table } from "../components";
import { useFieldsQuery } from "../generated/apolloComponents";

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
    numeric: false,
    disablePadding: false,
    label: "Id",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Название" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Описание",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Адрес" },
  {
    id: "roof",
    numeric: false,
    disablePadding: false,
    label: "Крытое/открытое",
  },
  { id: "price", numeric: false, disablePadding: false, label: "Цена" },
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
