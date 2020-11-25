import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

export const UploadButton: FC<UploadButtonProps> = (props) => {
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
      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          color="default"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Загрузить фото
        </Button>
      </label>
    </div>
  );
};
