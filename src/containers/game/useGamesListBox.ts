import { useTranslation } from "react-i18next";
import { HeadCell } from "../../components";
import {
  getGameBadgeLabel,
  StatusBadge,
} from "../../components/GameCard/StatusBadge";

export interface TableGame {
  id: string;
  address: string;
  price: number;
  status: string;
  userName: string;
  totalMembers: number;
  startDate: string;
}

export const useGamesListBox = () => {
  const { t } = useTranslation();
  const headCells: HeadCell<TableGame>[] = [
    {
      id: "id",
      primaryKey: true,
      label: t("game.fields.id"),
    },
    {
      id: "address",
      label: t("game.fields.address"),
      exportable: true,
      isItemLink: true,
      linkFormatter: (el: TableGame) => `/game/${el.id}`,
      filter: { type: "search" },
      valueGetter: (el: TableGame) => el.address || "",
    },
    {
      id: "price",
      exportable: true,
      label: t("game.fields.price"),
      filter: { type: "search" },
      valueGetter: (el: TableGame) =>
        typeof el?.price == "number" ? el.price.toString() : "",
    },
    {
      id: "status",
      exportable: true,
      label: t("game.fields.status"),
      BadgeComponent: StatusBadge,
      badgePropsExtractor: (el: TableGame) => ({ status: el.status }),
      filter: {
        type: "select",
        options: [
          t("form.calendarFilter.new"),
          t("form.calendarFilter.rejected"),
          t("form.calendarFilter.confirmed"),
          t("form.calendarFilter.finished"),
        ],
      },
      valueGetter: (el: TableGame) => getGameBadgeLabel(el.status || ""),
    },
    {
      id: "userName",
      exportable: true,
      label: t("game.fields.creator"),
      filter: { type: "search" },
      valueGetter: (el: TableGame) => el.userName || "",
    },
    {
      id: "totalMembers",
      exportable: true,
      label: t("game.fields.size"),
      filter: { type: "search" },
      valueGetter: (el: TableGame) => el?.totalMembers.toString() || "",
    },
    {
      id: "startDate",
      exportable: true,
      label: t("game.fields.dateAndTime"),
      valueGetter: (el: TableGame) => el.startDate || "",
      filter: { type: "dateRange", tip: "yyyy/mm/dd-yyyy/mm/dd " },
      minWidth: 200,
    },
  ];

  return { headCells };
};
