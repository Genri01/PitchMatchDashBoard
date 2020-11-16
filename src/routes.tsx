import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components";
import { Routes } from "./constants";
import { UserContext } from "./contexts";
import { CreateFieldPage, FieldPage, FieldsPage, LoginPage } from "./pages";

export const AppRoutes = () => {
  const { me, loading } = useContext(UserContext);

  if (loading) return null;

  return (
    <BrowserRouter>
      {!!me ? (
        <Layout>
          <Switch>
            <Route path={Routes.CREATE_FIELD} component={CreateFieldPage} />
            <Route path={Routes.FIELD} component={FieldPage} exact />
            <Route path={Routes.FIELDS} component={FieldsPage} />
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
