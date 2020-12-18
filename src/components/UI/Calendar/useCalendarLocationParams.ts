import { useParams } from "react-router-dom";

export interface TableLocationParams {
  year: string;
  month: string;
}

export const useCalendarLocationParams = () => {
  const routeParams = useParams<TableLocationParams>();

  let year = !isNaN(routeParams.year as any)
    ? parseInt(routeParams.year)
    : new Date().getFullYear();
  let month = !isNaN(routeParams.month as any)
    ? parseInt(routeParams.month)
    : new Date().getMonth();

  if (year < 0 || year > 10000) year = new Date().getFullYear();
  if (month < 0 || month > 11) month = new Date().getMonth();

  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);

  return {
    year,
    month,
    date,
  };
};
