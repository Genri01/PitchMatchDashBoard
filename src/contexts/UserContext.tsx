import React from "react";
import { createContext, FC } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  User,
  ViewerCredentialsInput,
} from "../generated/apolloComponents";

interface UserContextInterface {
  me: User | null;
  login: Function;
  logout: Function;
  loading: boolean;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserContextProvider: FC = ({ children }) => {
  const { data, error, refetch, loading } = useMeQuery({
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });
  const [loginMut] = useLoginMutation();
  const [logoutMut] = useLogoutMutation();
  const me = (error ? null : data?.viewer) as User | null;

  const login = async (data: ViewerCredentialsInput) => {
    await loginMut({ variables: { credentials: data } });
    await refetch();
  };

  const logout = async () => {
    await logoutMut();
    await refetch();
  };

  return (
    <UserContext.Provider value={{ me, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
