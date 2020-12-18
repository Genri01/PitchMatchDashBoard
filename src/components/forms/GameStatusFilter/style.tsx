import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filtersTitle: {
      marginBottom: theme.spacing(2),
    },
    filtersContainer: {},
    filterButton: {
      marginTop: theme.spacing(3),
    },
  })
);
