import React, { FC } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import { useStyles } from "./styles";

interface IProps {
  value?: string;
  onChange: Function;
  slight?: boolean;
  placeholder?: string;
}

export const Search: FC<IProps> = ({
  value = "",
  onChange,
  slight = false,
  placeholder = "",
}) => {
  const classes = useStyles({ slight });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
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
