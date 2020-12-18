import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectSlider: {
      marginTop: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      overflow: "scroll",
    },
    removeIcon: {
      display: "none",
      position: "absolute",
      top: "2px",
      right: "2px",
      zIndex: 1,
    },

    addImageIcon: {
      marginLeft: "5px",
    },

    item: {
      width: "19%",
      marginRight: theme.spacing(0.5),
      borderRadius: 5,
      cursor: "pointer",
      transitionDuration: "0.1s",
      border: "1px solid transparent",
      padding: 3,
      position: "relative",

      "&:hover $removeIcon": {
        display: "block",
      },
    },

    activeItem: {
      transitionDuration: "0.1s",
      border: `1px solid ${theme.palette.primary.main}`,
    },

    sliderImg: {
      width: "100%",

      "&:hover": {
        opacity: 0.8,
      },
    },
    activeImg: {
      transitionDuration: "0.1s",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  })
);
