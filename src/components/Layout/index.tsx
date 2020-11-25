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
import { MENU_ITEMS, MENU_ITEMS_ARR, MenuItem } from "../../constants";
import { UserContext } from "../../contexts";

interface NavLinkProps {
  item: MenuItem;
}

const NavLink: FC<NavLinkProps> = ({ item }) => (
  <Link
    to={item.path}
    style={{ textDecoration: "none", color: "inherit" }}
    key={item.name}
  >
    <ListItem button>
      <ListItemText primary={item.name} />
    </ListItem>
  </Link>
);

export const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { logout } = useContext(UserContext);
  const title = MENU_ITEMS_ARR.find((el) => el.path === pathname)?.name || "";

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

          {MENU_ITEMS.USER.filter((el) => el.displayInMenu).map((menuItem) => (
            <NavLink item={menuItem} key={menuItem.name} />
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>Поля</ListSubheader>

          {MENU_ITEMS.FIELD.filter((el) => el.displayInMenu).map((menuItem) => (
            <NavLink item={menuItem} key={menuItem.name} />
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
