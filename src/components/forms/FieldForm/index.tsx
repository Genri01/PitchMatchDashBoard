import React, { FC, ReactNode } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Avatar, Checkbox, FormControlLabel } from "@material-ui/core";

import { useFieldForm, UseFieldFormProps } from "./useFieldForm";
import { ImageUploader, MarkerMap } from "../../UI";
import { useStyles } from "./style";

interface IProps extends UseFieldFormProps {
  title: string;
  actionTitle: string;
  icon?: ReactNode;
}

export const FieldForm: FC<IProps> = ({
  mode = "create",
  existingData,
  title,
  actionTitle,
  icon,
}) => {
  const classes = useStyles();
  const { register, onSubmit, pos, setPos, setImages, watch } = useFieldForm({
    mode,
    existingData,
  });

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>{icon || <AddCircleIcon />}</Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div>
          <TextField
            label="Наименование поля"
            id="outlined-size-normal"
            variant="outlined"
            autoComplete="false"
            name="name"
            inputRef={register}
          />
          <TextField
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            inputRef={register}
          />
        </div>
        <div>
          <TextField
            label="Адрес"
            id="outlined-size-normal"
            variant="outlined"
            name="address"
            inputRef={register}
          />
          <TextField
            label="Цена"
            id="outlined-size-normal"
            variant="outlined"
            name="price"
            type="number"
            inputRef={register}
          />
        </div>
        <div>
          <TextField
            label="Телефон"
            id="outlined-size-normal"
            variant="outlined"
            name="phone"
            inputRef={register}
          />
          <TextField
            label="Email"
            id="outlined-size-normal"
            variant="outlined"
            name="email"
            inputRef={register}
          />
        </div>
        <div>
          <TextField
            id="datetime-local"
            label="Работает от"
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="fromTime"
            inputRef={register}
          />
          <TextField
            id="datetime-local"
            label="Работает от"
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="toTime"
            inputRef={register}
          />
        </div>
        <div>
          <TextField
            label="Размер"
            id="outlined-size-normal"
            variant="outlined"
            name="size"
            inputRef={register}
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={
              <Checkbox
                id="roof-input"
                inputRef={register}
                name="roof"
                defaultChecked={watch("roof")}
              />
            }
            label="Крытое"
          />
        </div>
        <div>
          <TextField
            label="Широта"
            id="outlined-size-normal"
            variant="outlined"
            type="number"
            value={pos.lat}
            onChange={(e) =>
              setPos({
                ...pos,
                lat: e.target.value ? parseFloat(e.target.value) : 0,
              })
            }
          />
          <TextField
            label="Долгота"
            id="outlined-size-normal"
            variant="outlined"
            type="number"
            value={pos.lng}
            onChange={(e) =>
              setPos({
                ...pos,
                lng: e.target.value ? parseFloat(e.target.value) : 0,
              })
            }
          />
        </div>
        <div className={classes.mapWrapper}>
          <MarkerMap
            containerClass={classes.mapContainer}
            pos={pos}
            onChange={(p) => setPos(p)}
          />
        </div>
        <div className={classes.imageUploaderWrapper}>
          <ImageUploader onChange={setImages} />
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {actionTitle}
        </Button>
      </form>
    </div>
  );
};
