import { makeStyles, Theme, createStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    logoTitle: {
      height: "64px",
      lineHeight: "64px",
      fontWeight: 300,
      display: "flex",
      paddingLeft: "17px",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: "17px",
    },
    toolbar: theme.mixins.toolbar,
    toolbarContent: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    badge: {
      margin: theme.spacing(2),
    },

    headerActionsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "13px",
    },
  })
);
