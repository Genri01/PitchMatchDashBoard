import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components";
import { Routes } from "./constants";
import { UserContext } from "./contexts";
import {
  CreateFieldPage,
  FieldPage,
  FieldsPage,
  LoginPage,
  UsersPage,
  EditFieldPage,
  GamesPage,
  GamePage,
  CreateGamePage,
  CalendarPage,
} from "./pages";
import { UserPage } from "./pages/user/UserPage";

export const AppRoutes = () => {
  const { me, loading } = useContext(UserContext);

  if (loading) return null;

  return (
    <BrowserRouter>
      {!!me ? (
        <Layout>
          <Switch>
            <Route path={Routes.CREATE_FIELD} component={CreateFieldPage} />
            <Route path={Routes.EDIT_FIELD} component={EditFieldPage} />
            <Route path={Routes.FIELD} component={FieldPage} exact />
            <Route path={Routes.FIELDS} component={FieldsPage} />

            <Route path={Routes.USERS} component={UsersPage} />
            <Route path={Routes.USER} component={UserPage} />

            <Route path={Routes.GAMES} component={GamesPage} />
            <Route path={Routes.CREATE_GAME} component={CreateGamePage} />
            <Route path={Routes.GAME} component={GamePage} />

            <Route path={Routes.GAMES_CALENDAR} component={CalendarPage} />
            <Route render={() => <Redirect to={Routes.FIELDS} />} />
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path={Routes.LOGIN} component={LoginPage} />
          <Route render={() => <Redirect to={Routes.LOGIN} />} />
        </Switch>
      )}
    </BrowserRouter>
  );
};
