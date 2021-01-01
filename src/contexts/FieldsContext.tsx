import React, { useContext } from "react";
import { createContext, FC } from "react";
import { Place, useFieldsQuery } from "../generated/apolloComponents";
import { ROLES } from "../utils";
import { UserContext } from "./UserContext";

interface FieldsContextInterface {
  fields: Place[];
  refetchFields: Function;
}

export const FieldsContext = createContext<FieldsContextInterface>(
  {} as FieldsContextInterface
);

export const FieldsContextProvider: FC = ({ children }) => {
  const { me } = useContext(UserContext);

  const { data, refetch } = useFieldsQuery({
    variables: { filter: ROLES.isManager(me) ? { userId: me!.id } : {} },
    errorPolicy: "ignore",
  });

  const fields = (data?.getPlaces?.rows?.filter((el) => !!el) || []) as Place[];

  return (
    <FieldsContext.Provider value={{ fields, refetchFields: refetch }}>
      {children}
    </FieldsContext.Provider>
  );
};
