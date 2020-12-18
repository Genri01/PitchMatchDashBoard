import { useParams } from "react-router-dom";

export interface TableLocationParams {
  pageNum: string;
  rowsPerPage: string;
}

export const useTableLocationParams = () => {
  const routeParams = useParams<TableLocationParams>();
  const pageNum = parseInt(routeParams.pageNum) || 0;
  const rowsPerPage = parseInt(routeParams.rowsPerPage) || 10;

  return {
    pageNum,
    rowsPerPage,
  };
};
