import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export const MuiSelect = (props) => {
  const { label, name, options } = props;

  const controllerProps = { ...props };
  delete controllerProps.className;

  return (
    <FormControl
      fullWidth={true}
      variant="outlined"
      className={props.className}
      required={props.required}
      error={props.error}
      size={props.size}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select id={name} {...controllerProps}>
        {props.noneOption && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}

        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{props?.helperText}</FormHelperText>
    </FormControl>
  );
};

export function FormSelect(props) {
  const { control } = useFormContext();

  const className = props.className;
  const controllerProps = { ...props };
  delete controllerProps.className;

  return (
    <React.Fragment>
      <Controller
        as={<MuiSelect className={className} />}
        control={control}
        defaultValue=""
        {...controllerProps}
      />
    </React.Fragment>
  );
}
