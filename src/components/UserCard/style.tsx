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
    profilePic: {
      width: 200,
      height: 200,
      borderRadius: "50%",
      margin: "auto",
    },
    inline: {
      display: "inline",
    },
    titleWrapper: {
      display: "flex",

      justifyContent: "center",
      alignItems: "center",
    },
  })
);
