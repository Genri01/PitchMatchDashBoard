import React, { useState, useRef } from "react";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useReactToPrint } from "react-to-print";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
// import DateRangePicker from "@material-ui/lab/DateRangePicker";
// import DateRangeDelimiter from "@material-ui/lab/DateRangeDelimiter";

import ReactExport from "react-export-excel";

import { useStyles } from "./styles";
import { Order, stableSort, getComparator } from "./funcs";
import { filterItems, FilterType, SearchFilterFunc } from "../../utils";
import { Link, MuiSelect, Search } from "../UI";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import {
  HeadCell,
  ActionsOptions,
  TableColumnFilter,
  TableFilterType,
} from ".";
import { EnhancedTableHead } from "./EnhancedTableHead";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface TableProps<T> {
  data: T[];
  title: string;
  headCells: HeadCell<T>[];
  routeBasename: string;
  pageNum?: number;
  rowsPerPage?: number;
  actionsOptions?: ActionsOptions;
}

const mapTableFilterTypes = (type: TableFilterType): FilterType => {
  switch (type) {
    case "select":
      return "search";

    default:
      return type;
  }
};

export function Table<T>({
  title,
  data = [],
  headCells,
  pageNum = 0,
  rowsPerPage: defaultRowsPerPage = 10,
  routeBasename,
  actionsOptions,
}: TableProps<T>) {
  const classes = useStyles();
  const { t } = useTranslation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  }) as Function;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(pageNum);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState({} as any);
  const history = useHistory();

  const columnFilters: {
    [key: string]: {
      filter: TableColumnFilter;
      func: Function;
    };
  } = headCells.reduce((acc, cur) => {
    if (cur.valueGetter && cur.filter) {
      acc[cur.id as string] = {
        filter: cur.filter,
        func: cur.valueGetter,
      };
    }
    return acc;
  }, {});

  Object.entries(columnFilters).forEach(([name, f]) => {
    const val = searchItems[name];
    if (val) {
      data = filterItems(
        val,
        data,
        [f.func as any],
        mapTableFilterTypes(f.filter.type)
      );
    }
  });

  data = filterItems(
    searchQuery,
    data,
    headCells
      .filter((hc) => !!hc.valueGetter)
      .map((hc) => hc.valueGetter) as SearchFilterFunc[],
    "search"
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
    history.push(`/${routeBasename}/${newPage}/${rowsPerPage}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsNum = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsNum);
    setPage(0);
    history.push(`/${routeBasename}/${0}/${newRowsNum}`);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title}>
          <ExcelFile
            element={
              <Tooltip title={t("action.downloadExcel") as string}>
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

          <Tooltip title={t("action.print") as string}>
            <IconButton aria-label="print" onClick={() => handlePrint()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.mainSearchWrapper}>
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`${t("action.search")}…`}
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
              //   @ts-ignore
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              actionsOptions={actionsOptions}
            />
            <TableBody>
              <TableRow hover tabIndex={-1}>
                {headCells.map((hc) =>
                  hc.filter && hc.valueGetter ? (
                    <TableCell>
                      {hc.filter?.type == "select" && (
                        <MuiSelect
                          noneOption
                          size="small"
                          //   @ts-ignore
                          options={hc.filter.options?.map((op) => ({
                            id: op,
                            label: op,
                          }))}
                          onChange={(v) =>
                            setSearchItems({
                              ...searchItems,
                              [hc.id]: v.target.value,
                            })
                          }
                        />
                      )}
                      {/* {hc.filter?.type == "dateRange" && (
                        <DateRangePicker
                          startText="Start"
                          endText="End"
                          // value={value}
                          // onChange={(newValue) => {
                        //   setValue(newValue);
                          // }}
                          renderInput={(startProps, endProps) => (
                            <React.Fragment>
                              <TextField {...startProps} variant="standard" />
                              <DateRangeDelimiter> to </DateRangeDelimiter>
                              <TextField {...endProps} variant="standard" />
                            </React.Fragment>
                          )}
                        />
                      )} */}
                      {["search", "numberRange"].includes(hc.filter?.type) && (
                        <Search
                          value={searchItems?.[hc.id]}
                          onChange={(v) =>
                            setSearchItems({ ...searchItems, [hc.id]: v })
                          }
                          slight={true}
                        />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )
                )}
                {!!actionsOptions && <TableCell></TableCell>}
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

                      {actionsOptions?.actionItem && (
                        // @ts-ignore
                        <TableCell>
                          {actionsOptions.actionItem(row.id)}
                        </TableCell>
                      )}
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
