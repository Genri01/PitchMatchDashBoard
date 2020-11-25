import { Box } from "@material-ui/core";
import React, { FC, useState } from "react";
import { File, Maybe } from "../../../generated/apolloComponents";
import { ImageList } from "../ImageList";

interface IProps {
  files: Maybe<File>[];
}

export const ImageBrowser: FC<IProps> = ({ files }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <Box>
      <Box alignItems="flex-start">
        <img src={files[selectedIdx]?.url} width="100%" />
      </Box>
      <ImageList
        files={files}
        selectedIdx={selectedIdx}
        onChange={(idx) => setSelectedIdx(idx)}
      />
    </Box>
  );
};
