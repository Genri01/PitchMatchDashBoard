import { makeStyles, Theme, createStyles, fade } from "@material-ui/core";

interface IProps {
  slight: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: (props: IProps) =>
        props.slight
          ? fade(theme.palette.primary.light, 0.05)
          : fade(theme.palette.primary.light, 0.15),
      "&:hover": {
        backgroundColor: (props: IProps) =>
          props.slight
            ? fade(theme.palette.primary.light, 0.1)
            : fade(theme.palette.primary.light, 0.25),
      },
      marginLeft: 0,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
    },
  })
);
