export type SearchFilterFunc = (el: any) => any;

export const searchFilter = (
  searchTerm: string,
  items: Array<any>,
  searchProps: Array<string> | Array<SearchFilterFunc>
) => {
  const strTranform = (str: string) => str?.toLocaleLowerCase().trim();

  if (searchProps.length && searchTerm) {
    searchTerm = strTranform(searchTerm);
    if (typeof searchProps[0] === "string") {
      items = items.filter((el) => {
        for (let propName in el) {
          // @ts-ignore
          if (searchProps.includes(propName)) {
            if (strTranform(el[propName]).includes(searchTerm)) {
              return true;
            }
          }
        }

        return false;
      });
    } else if (typeof searchProps[0] === "function") {
      items = items.filter((el) => {
        for (let propExtracter of searchProps) {
          // @ts-ignore
          if (strTranform(propExtracter(el)).includes(searchTerm)) {
            return true;
          }
        }

        return false;
      });
    }
  }

  return items;
};
