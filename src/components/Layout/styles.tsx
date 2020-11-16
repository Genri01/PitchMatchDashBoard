import { makeStyles, Theme, createStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    logoTitle: {
      height: "64px",
      lineHeight: "64px",
      fontWeight: 300,
      display: "flex",
      paddingLeft: "17px",
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
  })
);
