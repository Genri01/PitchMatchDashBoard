import React, { FC, useState, useRef } from "react";
import clsx from "clsx";
import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useReactToPrint } from "react-to-print";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import ReactExport from "react-export-excel";

import { useStyles, useToolbarStyles } from "./styles";
import { Order, stableSort, getComparator } from "./funcs";
import { Link } from "../UI/Link";
import { searchFilter } from "../../utils";
import { Place } from "../../generated/apolloComponents";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps<T> {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
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
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title: string;
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  title,
  children,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      {children}
    </Toolbar>
  );
};

interface IProps<T> {
  data: T[];
  title: string;
  headCells: HeadCell<T>[];
}

export function Table<T>({ title, data, headCells }: IProps<T>) {
  const classes = useStyles();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  }) as Function;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  data = searchFilter(searchQuery, data, [
    (el: Place) => el?.name || "",
    (el: Place) => el?.description || "",
    (el: Place) => el?.address || "",
    (el: Place) => (typeof el?.price == "number" ? el.price.toString() : ""),
  ]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as any);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title}>
          <ExcelFile
            element={
              <Tooltip title="Скачать EXCEL">
                <IconButton aria-label="download excel">
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ExcelSheet data={data} name="Data">
              <ExcelColumn label="Id" value="id" />
              <ExcelColumn label="Название" value="name" />
              <ExcelColumn label="Описание" value="description" />
              <ExcelColumn label="Адрес" value="address" />
              <ExcelColumn label="Цена" value="price" />
              <ExcelColumn
                label="Крытое/открытое"
                value={(col) => (col.roof ? "Да" : "Нет")}
              />
            </ExcelSheet>
          </ExcelFile>

          <Tooltip title="Print">
            <IconButton aria-label="print" onClick={() => handlePrint()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </EnhancedTableToolbar>
        <TableContainer ref={componentRef as any}>
          <MaterialTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data as any, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell component="th" id={labelId} scope="row">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell>
                        <Link to={`/field/${row.id}`}>{row.name}</Link>
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.roof ? "Да" : "Нет"}</TableCell>
                      <TableCell>{row.price}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MaterialTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
