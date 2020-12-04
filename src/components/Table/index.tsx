import React, { FC, useState, useRef, ElementType } from "react";
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

import ReactExport from "react-export-excel";

import { useStyles, useToolbarStyles } from "./styles";
import { Order, stableSort, getComparator } from "./funcs";
import { searchFilter, SearchFilterFunc } from "../../utils";
import { Link, Search } from "../UI";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export interface HeadCell<T> {
  disablePadding?: boolean;
  id: keyof T;
  primaryKey?: boolean;
  isImage?: boolean;
  isItemLink?: boolean;
  linkFormatter?: (el: T) => string;
  label: string;
  BadgeComponent?: ElementType;
  badgePropsExtractor?: (el: T) => Object;
  numeric?: boolean;
  exportable?: boolean;
  withSeparateSearch?: boolean;
  valueGetter?: SearchFilterFunc;
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

export function Table<T>({ title, data = [], headCells }: IProps<T>) {
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
  const [searchItems, setSearchItems] = useState({} as any);

  const separateSearchFuncs: { [key: string]: Function } = headCells.reduce(
    (acc, cur) => {
      if (cur.valueGetter && cur.withSeparateSearch) {
        acc[cur.id as string] = cur.valueGetter;
      }
      return acc;
    },
    {}
  );

  Object.entries(separateSearchFuncs).forEach(([name, func]) => {
    const val = searchItems[name];
    if (val) {
      data = searchFilter(val, data, [func as any]);
    }
  });

  data = searchFilter(
    searchQuery,
    data,
    headCells
      .filter((hc) => !!hc.valueGetter)
      .map((hc) => hc.valueGetter) as SearchFilterFunc[]
  );

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
              {headCells
                .filter((hc) => hc.exportable)
                .map((hc) => (
                  <ExcelColumn
                    label={hc.label}
                    value={hc.valueGetter || hc.id}
                  />
                ))}
            </ExcelSheet>
          </ExcelFile>

          <Tooltip title="Print">
            <IconButton aria-label="print" onClick={() => handlePrint()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.mainSearchWrapper}>
            <Search value={searchQuery} onChange={setSearchQuery} />
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
              <TableRow hover tabIndex={-1}>
                {headCells.map((hc) =>
                  hc.withSeparateSearch && hc.valueGetter ? (
                    <TableCell>
                      <Search
                        value={searchItems?.[hc.id]}
                        onChange={(v) =>
                          setSearchItems({ ...searchItems, [hc.id]: v })
                        }
                        slight={true}
                      />
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )
                )}
              </TableRow>
              {stableSort(data as any, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const extractValue = (hc: HeadCell<T>, row: T) =>
                    hc.valueGetter ? hc.valueGetter(row) : row[hc.id];

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell component="th" id={labelId} scope="row">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      {headCells
                        .filter((hc) => !hc.primaryKey)

                        .map((hc) => {
                          if (hc.isItemLink && hc.linkFormatter) {
                            return (
                              <TableCell>
                                <Link to={hc.linkFormatter(row)}>
                                  {extractValue(hc, row)}
                                </Link>
                              </TableCell>
                            );
                          }

                          if (hc.BadgeComponent && hc.badgePropsExtractor) {
                            return (
                              <TableCell>
                                <hc.BadgeComponent
                                  {...hc.badgePropsExtractor(row)}
                                />
                              </TableCell>
                            );
                          }

                          if (hc.isImage) {
                            const imgSrc = extractValue(hc, row);
                            return imgSrc ? (
                              <TableCell>
                                <img
                                  src={imgSrc}
                                  className={classes.profilePic}
                                  alt=""
                                />
                              </TableCell>
                            ) : (
                              <TableCell />
                            );
                          }

                          return <TableCell>{extractValue(hc, row)}</TableCell>;
                        })}
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
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
