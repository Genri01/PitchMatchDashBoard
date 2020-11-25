import React, { FC } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import { useStyles } from "./styles";

interface IProps {
  value?: string;
  onChange: Function;
  slight?: boolean;
}

export const Search: FC<IProps> = ({
  value = "",
  onChange,
  slight = false,
}) => {
  const classes = useStyles({ slight });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Поиск…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};
