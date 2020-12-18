import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((_theme: Theme) => ({
  wrapper: {
    width: "140px",
    height: "32px",
    background: "#FFFFFF",
    border: "1px solid #EAEAEA",
    boxSizing: "border-box",
    borderRadius: "4px",
    display: "flex",
    overflow: "hidden",
  },
  toggle: {
    color: "#242635",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "Gilroy",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "140%",
  },

  selected: {
    background: "#3882D0",
    color: "#FFFFFF",
  },
}));
