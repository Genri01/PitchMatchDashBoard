import React, { FC } from "react";
import clsx from "clsx";
import { useToolbarStyles } from "./styles";
import { Toolbar, Typography, Box } from "@material-ui/core";

interface EnhancedTableToolbarProps {
  title: string;
}

export const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  title,
  children,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root)}
      style={{
        overflow: "scroll",
      }}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      <Box className={classes.toolbarActionsWrapper}>{children}</Box>
    </Toolbar>
  );
};
