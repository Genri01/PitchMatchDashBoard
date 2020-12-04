import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    new: {
      background: "darkorange",
      color: "white",
      marginTop: 2,
    },
    cancelled: {
      background: "#ff3066",
      color: "white",
      marginTop: 2,
    },
    confirmed: {
      background: "limegreen",
      color: "white",
      marginTop: 2,
    },
    finished: {
      color: "black",
      marginTop: 2,
    },
  })
);
