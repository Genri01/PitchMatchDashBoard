import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",

      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);
