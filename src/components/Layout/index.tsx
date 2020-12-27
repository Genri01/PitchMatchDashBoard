import React, { FC, useContext, useState } from "react";
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
import {
  Box,
  Container,
  Hidden,
  IconButton,
  ListSubheader,
  useTheme,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";

import { useStyles } from "./styles";
import { MenuItem, useMenuItems } from "../../constants";
import { GamesContext, UserContext } from "../../contexts";
import { LangToggle } from "..";
import { useTranslation } from "react-i18next";
import { ROLES } from "../../utils";

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
  const theme = useTheme();
  const { t } = useTranslation();
  const { MENU_ITEMS, MENU_ITEMS_ARR } = useMenuItems();
  const { pathname } = useLocation();
  const { logout, me } = useContext(UserContext);
  const title =
    MENU_ITEMS_ARR.find((el) => pathname.includes(el.path))?.name || "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { games } = useContext(GamesContext);
  const unconfirmedGames = games.filter((el) => el.status == "new");

  const drawer = (
    <>
      {" "}
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
        <ListSubheader>{t("tab.gamesBookings")}</ListSubheader>
        <Link
          to={"/calendar"}
          style={{ textDecoration: "none", color: "inherit" }}
          key={"calendar"}
        >
          <ListItem button>
            <ListItemText primary={t("page.calendar")} />
            <Badge
              badgeContent={unconfirmedGames?.length}
              className={classes.badge}
              color="primary"
            />
          </ListItem>
        </Link>
        {MENU_ITEMS.GAME.filter((el) => el.displayInMenu).map((menuItem) => (
          <NavLink item={menuItem} key={menuItem.name} />
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>{t("tab.users")}</ListSubheader>

        {MENU_ITEMS.USER.filter((el) => el.displayInMenu).map((menuItem) => (
          <NavLink item={menuItem} key={menuItem.name} />
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>{t("tab.fields")}</ListSubheader>

        {MENU_ITEMS.FIELD.filter((el) => el.displayInMenu).map((menuItem) => (
          <NavLink item={menuItem} key={menuItem.name} />
        ))}
      </List>
      {ROLES.shouldBeDisplayed.menu.accessSection(me) && (
        <>
          <Divider />
          <List>
            <ListSubheader>{t("tab.settings")}</ListSubheader>

            {MENU_ITEMS.SETTINGS.filter((el) => el.displayInMenu).map(
              (menuItem) => (
                <NavLink item={menuItem} key={menuItem.name} />
              )
            )}
          </List>
        </>
      )}
    </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <Box className={classes.toolbarContent}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" display="inline" noWrap>
              {title}
            </Typography>
            <Box className={classes.headerActionsContainer}>
              <LangToggle />
              <IconButton aria-label="logout" onClick={() => logout()}>
                <ExitToAppIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Container>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {children}
        </main>
      </Container>
    </div>
  );
};
