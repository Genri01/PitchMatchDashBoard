import { ElementType, ReactNode } from "react";
import { SearchFilterFunc } from "../../utils";

interface TableNumberRangeOptions {
  min: number;
  max: number;
  step?: number;
}

type TableSelectOptions = string[];

export type TableFilterType = "search" | "select" | "numberRange" | "dateRange";

export interface TableColumnFilter {
  type: TableFilterType;
  options?: TableSelectOptions | TableNumberRangeOptions;
}

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
  filter?: TableColumnFilter;
  withSeparateSearch?: boolean;
  valueGetter?: SearchFilterFunc;
}

export interface ActionsOptions {
  columnTitle: string;
  actionItem: (id: string) => ReactNode;
}
