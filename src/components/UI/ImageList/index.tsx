import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import React, { FC } from "react";
import { File, Maybe } from "../../../generated/apolloComponents";
import { useStyles } from "./style";
import { UploadButton } from "..";

interface IProps {
  files: Maybe<File>[];
  selectedIdx: number;
  rawFiles?: boolean;
  onChange: (idx: number) => void;
  onDelete?: (idx: number) => void;
  onMoreUpload?: Function;
  editable?: boolean;
}

export const ImageList: FC<IProps> = ({
  files,
  selectedIdx = 0,
  rawFiles = false,
  onChange,
  onDelete,
  onMoreUpload,
  editable = false,
}) => {
  const classes = useStyles();

  return (
    <Box alignItems="flex-start" className={classes.selectSlider}>
      {files.map((img, idx) => (
        <div
          className={`${classes.item} ${
            idx == selectedIdx ? classes.activeItem : ""
          }`}
          key={idx}
        >
          {editable && (
            <IconButton
              aria-label="delete"
              className={classes.removeIcon}
              color="secondary"
              size="small"
              onClick={() => onDelete && onDelete(idx)}
            >
              <DeleteIcon
                fontSize="inherit"
                style={{
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          )}

          <img
            src={rawFiles ? URL.createObjectURL(img) : img?.url}
            className={`${classes.sliderImg}`}
            onClick={() => onChange(idx)}
          />
        </div>
      ))}

      {editable && (
        <UploadButton onChange={(e) => onMoreUpload && onMoreUpload(e)}>
          <IconButton className={classes.addImageIcon} component="span">
            <AddIcon />
          </IconButton>
        </UploadButton>
      )}
    </Box>
  );
};
