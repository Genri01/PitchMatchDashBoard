import React, { FC, ReactNode } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useFieldForm, UseFieldFormProps } from "./useFieldForm";
import { ImageUploader, MarkerMap } from "../../UI";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../../constants";

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
  const { t } = useTranslation();
  const {
    register,
    onSubmit,
    pos,
    setPos,
    setImages,
    watch,
    errors,
    serverError,
    setServerError,
    formState,
    existingFiles,
  } = useFieldForm({
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.name")}
              id="outlined-size-normal"
              variant="outlined"
              autoComplete="false"
              name="name"
              required
              inputRef={register({
                required: t("error.required") as string,
              })}
              error={errors.name}
              helperText={errors?.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.description")}
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              name="description"
              inputRef={register}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.address")}
              id="outlined-size-normal"
              variant="outlined"
              name="address"
              required
              inputRef={register({
                required: t("error.required") as string,
              })}
              error={errors.address}
              helperText={errors?.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.price")}
              id="outlined-size-normal"
              variant="outlined"
              name="price"
              type="number"
              inputRef={register}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.phoneNumber")}
              id="outlined-size-normal"
              variant="outlined"
              name="phone"
              type="number"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.email")}
              id="outlined-size-normal"
              variant="outlined"
              name="email"
              inputRef={register({
                pattern: {
                  value: REGEX.EMAIL,
                  message: t("error.email") as string,
                },
              })}
              error={errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.openFrom")}
              id="datetime-local"
              type="time"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              name="fromTime"
              required
              inputRef={register({
                required: t("error.required") as string,
              })}
              error={errors.fromTime}
              helperText={errors?.fromTime?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.openTo")}
              id="datetime-local"
              type="time"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              name="toTime"
              required
              inputRef={register({
                required: t("error.required") as string,
              })}
              error={errors.toTime}
              helperText={errors?.toTime?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.size")}
              id="outlined-size-normal"
              variant="outlined"
              name="size"
              required
              inputRef={register({
                required: t("error.required") as string,
              })}
              error={errors.size}
              helperText={errors?.size?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              label={t("form.fieldForm.indoor")}
            />{" "}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.latitude")}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("form.fieldForm.longitude")}
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
            />{" "}
          </Grid>

          <Grid item xs={12}>
            <MarkerMap
              containerClass={classes.mapContainer}
              pos={pos}
              onChange={(p) => setPos(p)}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.imageUploaderWrapper}>
              <ImageUploader
                onChange={setImages}
                existingFiles={existingFiles}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!formState.isValid}
            >
              {actionTitle}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={!!serverError}
        autoHideDuration={6000}
        onClose={() => setServerError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert elevation={6} variant="standard" severity="error">
          {serverError}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
