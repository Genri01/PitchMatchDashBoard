import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 635,
    margin: "auto",
    marginBottom: 50,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fullwidthField: {
    width: "100%",
  },
  field: {
    width: "100%",
  },
  submit: {
    width: "100%",
  },
  mapWrapper: {
    width: "100%",
    height: "400px",
    margin: theme.spacing(1),
    padding: "0 8px",
  },
  mapContainer: {
    width: "100%",
    height: "400px",
    borderRadius: 8,
    overflow: "hidden",
  },
}));
