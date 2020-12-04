import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const MuiSelect = (props) => {
  const { label, name, options } = props;

  const controllerProps = { ...props };
  delete controllerProps.className;

  return (
    <FormControl
      fullWidth={true}
      variant="outlined"
      className={props.className}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select id={name} {...controllerProps}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export function FormSelect(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;
  const className = props.className;

  const controllerProps = { ...props };
  delete controllerProps.className;

  return (
    <React.Fragment>
      <Controller
        as={<MuiSelect className={className} />}
        control={control}
        name={name}
        label={label}
        options={options}
        defaultValue=""
        {...controllerProps}
      />
    </React.Fragment>
  );
}
