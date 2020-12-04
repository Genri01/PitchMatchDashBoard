import { format } from "date-fns";
import React, { useContext } from "react";
import { HeadCell, Table } from "../../components";
import {
  getGameBadgeLabel,
  StatusBadge,
} from "../../components/GameCard/StatusBadge";
import { GamesContext } from "../../contexts";

interface TableGame {
  id: string;
  address: string;
  price: number;
  status: string;
  userName: string;
  totalMembers: number;
  startDate: string;
}

const headCells: HeadCell<TableGame>[] = [
  {
    id: "id",
    primaryKey: true,
    label: "Id",
  },
  {
    id: "address",
    label: "Адрес",
    exportable: true,
    isItemLink: true,
    linkFormatter: (el: TableGame) => `/game/${el.id}`,
    withSeparateSearch: true,
    valueGetter: (el: TableGame) => el.address || "",
  },
  {
    id: "price",
    exportable: true,
    label: "Цена",
    withSeparateSearch: true,
    valueGetter: (el: TableGame) =>
      typeof el?.price == "number" ? el.price.toString() : "",
  },
  {
    id: "status",
    exportable: true,
    label: "Статус",
    BadgeComponent: StatusBadge,
    badgePropsExtractor: (el: TableGame) => ({ status: el.status }),
    withSeparateSearch: true,
    valueGetter: (el: TableGame) => getGameBadgeLabel(el.status || ""),
  },
  {
    id: "userName",
    exportable: true,
    label: "Создатель игры",
    withSeparateSearch: true,
    valueGetter: (el: TableGame) => el.userName || "",
  },
  {
    id: "totalMembers",
    exportable: true,
    label: "Количество игроков",
    withSeparateSearch: true,
    valueGetter: (el: TableGame) => el?.totalMembers.toString() || "",
  },
  {
    id: "startDate",
    exportable: true,
    label: "Дата/Время",
    withSeparateSearch: true,
    valueGetter: (el: TableGame) => el.startDate || "",
  },
];

export const GamesListBox = () => {
  const { games } = useContext(GamesContext);
  const data = games.map((el) => ({
    ...el,
    userName: `${el?.user?.firstName || ""} ${el?.user?.lastName || ""}`,
    startDate: el?.startDate
      ? format(new Date(el.startDate), "yyyy-MM-dd hh:mm")
      : "-",
  })) as TableGame[];

  return (
    <div>
      <Table title={"Игры"} data={data} headCells={headCells} />
    </div>
  );
};
