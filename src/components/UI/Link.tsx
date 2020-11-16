import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

interface IProps {
  to: string;
}

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "#1976d1",
      "&:hover": {
        textDecoration: "underline",
        color: "#1976d1",
      },
      "&:active": {
        color: "#1976d1",
      },
      "&:visited": {
        color: "#1976d1",
      },
    },
  })
);

export const Link: FC<IProps> = ({ to, children }) => {
  const classes = useStyles();
  return (
    <RouterLink to={to} className={classes.link}>
      {children}
    </RouterLink>
  );
};
