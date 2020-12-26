import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { HeadCell, ActionsOptions } from ".";
import { useStyles } from "../Layout/styles";
import { Order } from "./funcs";

interface EnhancedTableProps<T> {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
  actionsOptions?: ActionsOptions;
}

export function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                //   @ts-ignore
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        {!!props.actionsOptions && (
          <TableCell key={"actions"} align={"left"} padding={"default"}>
            {props.actionsOptions.columnTitle}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
