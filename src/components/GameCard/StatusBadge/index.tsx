import { Chip } from "@material-ui/core";
import React, { FC } from "react";
import { useStyles } from "./style";

interface IProps {
  status: string;
}

const STATUSES = ["new", "cancelled", "confirmed", "finishes"];

export const getGameStatusBadgeColor = (status: string) => {
  switch (status) {
    case "new":
      return "darkorange";
    case "confirmed":
      return "limegreen";
    case "cancelled":
      return "#ff3066";
    case "finished":
      return "#e0e0e0";

    default:
      return "#e0e0e0";
  }
};

export const getGameBadgeLabel = (status: string) => {
  switch (status) {
    case "new":
      return "Новая";
    case "cancelled":
      return "Отмененная";
    case "confirmed":
      return "Подтвержденная";
    case "finished":
      return "Закончена";

    default:
      return status;
  }
};

export const StatusBadge: FC<IProps> = ({ status }) => {
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={getGameBadgeLabel(status)}
      className={STATUSES.includes(status) ? classes[status] : ""}
    />
  );
};
