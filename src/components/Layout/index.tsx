import React, { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Box, IconButton, ListSubheader } from "@material-ui/core";

import { useStyles } from "./styles";
import { MENU_ITEMS } from "../../constants";
import { UserContext } from "../../contexts";

export const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { logout } = useContext(UserContext);
  const title = MENU_ITEMS.FIELD.find((el) => el.path === pathname)?.name || "";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <Box className={classes.toolbarContent}>
            <Typography variant="h6" display="inline" noWrap>
              {title}
            </Typography>
            <IconButton aria-label="logout" onClick={() => logout()}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography
          component="span"
          variant="h4"
          className={classes.logoTitle}
          color="primary"
        >
          Pitch-match
        </Typography>
        <Divider />
        <List>
          <ListSubheader>Игры/бронирования</ListSubheader>

          {["Календарь", "Все игры", "Cтраница игры", "Создать игру"].map(
            (text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          <ListSubheader>Пользователи</ListSubheader>

          {[
            "Все пользователи",
            "Cтраница пользователя",
            "Редактирование пользователя",
          ].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>Поля</ListSubheader>

          {MENU_ITEMS.FIELD.filter((el) => el.displayInMenu).map((menuItem) => (
            <Link
              to={menuItem.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button key={menuItem.name}>
                <ListItemText primary={menuItem.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
