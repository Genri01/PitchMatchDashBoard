import { createStyles, makeStyles, Theme } from "@material-ui/core";

import React, { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: "none",
    },
  })
);

type UploadButtonProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const UploadButton: FC<UploadButtonProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        {...props}
      />
      <label htmlFor="contained-button-file">{children}</label>
    </div>
  );
};
