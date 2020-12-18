import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  mapWrapper: {
    width: "100%",
    height: "400px",
    margin: theme.spacing(1),
    padding: "0 8px",
  },
  mapContainer: {
    width: "100%",
    height: "500px",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: theme.spacing(2),
  },
}));
