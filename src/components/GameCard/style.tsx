import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "800px",
      margin: "auto",
    },
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    titleWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mapContainer: {
      width: "100%",
      height: "400px",
      borderRadius: 8,
      overflow: "hidden",
    },
  })
);
