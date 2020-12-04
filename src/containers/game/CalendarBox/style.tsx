import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      gap: "15px",
    },
    calendarWrapper: {
      width: "80%",
    },
    filtersWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "20%",
      padding: "20px",
    },
    filtersTitle: {
      marginBottom: theme.spacing(2),
    },
    filtersContainer: {},
    filterButton: {
      marginTop: theme.spacing(3),
    },
  })
);
