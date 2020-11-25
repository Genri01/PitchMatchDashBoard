import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      textAlign: "center",
    },
    cropContainer: {
      position: "relative",
      width: "100%",
      height: 200,
      background: "#333",
      [theme.breakpoints.up("sm")]: {
        height: 400,
      },
    },
    cropButton: {
      flexShrink: 0,
      marginLeft: 16,
    },
    controls: {
      padding: "16px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "center",
        gap: "30px",
      },
    },
    sliderContainer: {
      display: "flex",
      gap: "20px",
      flex: "1",
      alignItems: "center",
    },
    sliderLabel: {
      [theme.breakpoints.down("xs")]: {
        minWidth: 65,
      },
    },
    slider: {
      padding: "22px 0px",
      marginLeft: 20,
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "center",
        margin: "0 16px",
      },
    },
  })
);
