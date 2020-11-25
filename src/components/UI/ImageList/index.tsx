import { Box } from "@material-ui/core";
import React, { FC } from "react";
import { File, Maybe } from "../../../generated/apolloComponents";
import { useStyles } from "./style";

interface IProps {
  files: Maybe<File>[];
  selectedIdx: number;
  rawFiles?: boolean;
  onChange: (idx: number) => void;
}

export const ImageList: FC<IProps> = ({
  files,
  selectedIdx = 0,
  rawFiles = false,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <Box alignItems="flex-start" className={classes.selectSlider}>
      {files.map((img, idx) => (
        <img
          key={idx}
          src={rawFiles ? URL.createObjectURL(img) : img?.url}
          className={`${classes.sliderImg} ${
            idx == selectedIdx ? classes.activeImg : ""
          }`}
          onClick={() => onChange(idx)}
        />
      ))}
    </Box>
  );
};
