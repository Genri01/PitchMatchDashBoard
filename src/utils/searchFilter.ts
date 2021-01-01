import { REGEX } from "../constants";

export type SearchFilterFunc = (el: any) => any;

export type FilterType = "search" | "numberRange" | "dateRange" | "timeHMrange";

export const filterItems = (
  searchTerm: string,
  items: Array<any>,
  propExtractors: Array<SearchFilterFunc>,
  filterType: FilterType
) => {
  const strTranform = (str: string) => str?.toLocaleLowerCase().trim();

  if (propExtractors.length && searchTerm) {
    searchTerm = strTranform(searchTerm);
    if (typeof propExtractors[0] === "function") {
      items = items.filter((el) => {
        for (let propExtracter of propExtractors) {
          if (filterType == "search") {
            // @ts-ignore
            if (strTranform(propExtracter(el)).includes(searchTerm)) {
              return true;
            }
          } else if (filterType == "numberRange") {
            const regexRes = REGEX.NUMBER_RANGE.exec(searchTerm);
            if (!regexRes) return true;

            const low = parseInt(regexRes[1]);
            const high = parseInt(regexRes[2]);
            const val = parseInt(propExtracter(el));
            return val >= low && val <= high;
          } else if (filterType == "dateRange") {
            const regexRes = REGEX.DATE_RANGE.exec(searchTerm);
            if (!regexRes) return true;

            const low = new Date(regexRes[1]).getTime();
            const high = new Date(regexRes[2]).getTime();
            const val = new Date(propExtracter(el)).getTime();
            return val >= low && val <= high;
          } else if (filterType == "timeHMrange") {
            const val = propExtracter(el);

            const inputRegexRes = REGEX.TIME_HM_RANGE.exec(searchTerm);
            const valRegexRes = REGEX.TIME_HM_RANGE.exec(val);
            if (!val) return false;
            if (!inputRegexRes || !valRegexRes) return true;

            const searchLow = new Date(
              `2020/01/01 ${inputRegexRes[1]}`
            ).getTime();
            const searchHigh = new Date(
              `2020/01/01 ${inputRegexRes[2]}`
            ).getTime();
            const valLow = new Date(`2020/01/01 ${valRegexRes[1]}`).getTime();
            const valHigh = new Date(`2020/01/01 ${valRegexRes[2]}`).getTime();

            return searchLow >= valLow && valHigh >= searchHigh;
          }
        }

        return false;
      });
    }
  }

  return items;
};
