import { REGEX } from "../constants";

export type SearchFilterFunc = (el: any) => any;

export type FilterType = "search" | "numberRange" | "dateRange";

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
          }
        }

        return false;
      });
    }
  }

  return items;
};
