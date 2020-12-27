import React, { FC } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import { useStyles } from "./styles";
import { FormHelperText } from "@material-ui/core";

interface IProps {
  value?: string;
  onChange: Function;
  slight?: boolean;
  placeholder?: string;
  helperText?: string;
}

export const Search: FC<IProps> = ({
  value = "",
  onChange,
  slight = false,
  placeholder = "",
  helperText,
}) => {
  const classes = useStyles({ slight });

  return (
    <div
      style={{
        position: "relative",
      }}
    >
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
      {helperText && (
        <FormHelperText
          style={{
            position: "absolute",
            bottom: "-20px",
            textAlign: "left",
            width: "100%",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};
