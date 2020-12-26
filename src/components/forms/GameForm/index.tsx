import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MuiAlert from "@material-ui/lab/Alert";

import { Avatar, Grid, Snackbar } from "@material-ui/core";

import { useStyles } from "./style";
import { useGameForm } from "./useGameForm";
import { FieldSelectMap, FormSelect } from "../../UI";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const GameForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    register,
    onSubmit,
    formMethods,
    fields,
    field,
    setField,
    serverError,
    setServerError,
    errors,
    formState,
  } = useGameForm();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>{<AddCircleIcon />}</Avatar>
      <Typography component="h1" variant="h5">
        {t("form.gameForm.createTitle")}
      </Typography>
      <FormProvider {...formMethods}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="description"
                label={t("form.gameForm.description")}
                multiline
                rows={4}
                className={classes.fullwidthField}
                variant="outlined"
                name="description"
                inputRef={register()}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormSelect
                name="reg"
                label={t("form.gameForm.registration")}
                className={classes.field}
                options={[
                  { id: "opened", label: t("form.gameForm.regType.open") },
                  { id: "closed", label: t("form.gameForm.regType.closed") },
                  {
                    id: "byRequest",
                    label: t("form.gameForm.regType.request"),
                  },
                ]}
                rules={{ required: t("error.required") as string }}
                required
                error={errors.reg}
                helperText={errors?.reg?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.field}
                label={t("form.gameForm.price")}
                id="price"
                variant="outlined"
                name="price"
                type="number"
                required
                inputRef={register({
                  required: t("error.required") as string,
                })}
                error={errors.price}
                helperText={errors?.price?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.field}
                label={t("form.gameForm.ageFrom")}
                id="ageFrom"
                variant="outlined"
                name="ageFrom"
                type="number"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.field}
                label={t("form.gameForm.ageTo")}
                id="ageTo"
                variant="outlined"
                name="ageTo"
                type="number"
                inputRef={register}
                error={errors.ageTo}
                helperText={errors?.ageTo?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormSelect
                name="gender"
                label={t("form.gameForm.sex")}
                className={classes.field}
                options={[
                  { id: "", label: t("form.gameForm.any") },
                  { id: "m", label: t("form.gameForm.male") },
                  { id: "f", label: t("form.gameForm.female") },
                ]}
                rules={{ required: t("error.required") as string }}
                required
                error={errors.gender}
                helperText={errors?.gender?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                name="size"
                label={t("form.gameForm.size")}
                className={classes.field}
                options={[
                  { id: 4, label: "4х4" },
                  { id: 5, label: "5х5" },
                  { id: 6, label: "6х6" },
                  { id: 7, label: "7х7" },
                  { id: 8, label: "8х8" },
                  { id: 9, label: "9х9" },
                ]}
                rules={{ required: t("error.required") as string }}
                required
                error={errors.size}
                helperText={errors?.size?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                lang="fr"
                className={classes.field}
                id="datetime-local"
                label={t("form.gameForm.dateAndTime")}
                type="datetime-local"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="startDate"
                required
                inputRef={register({
                  required: t("error.required") as string,
                })}
                error={errors.startDate}
                helperText={errors?.startDate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={classes.field}
                id="address"
                options={fields}
                getOptionLabel={(f) => f?.address || ""}
                onChange={(_e, f) => setField(f)}
                renderInput={(params) => {
                  const filled =
                    !!Object.keys(formState.touched).length && !field?.address;
                  (params.inputProps as any).value = field?.address;

                  return (
                    <TextField
                      {...params}
                      label={t("form.gameForm.fieldAndAddress")}
                      variant="outlined"
                      value=""
                      required
                      error={filled}
                      helperText={filled ? (t("error.required") as string) : ""}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FieldSelectMap
                containerClass={classes.mapContainer}
                onChoose={setField}
                selectedItem={field}
                fields={fields}
                pos={field?.point?.location.coordinates}
                withClusters={true}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!formState.isValid}
              >
                {t("action.create")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Snackbar
        style={{
          maxWidth: 400,
        }}
        open={!!serverError}
        autoHideDuration={6000}
        onClose={() => setServerError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert elevation={6} variant="standard" severity="error">
          {serverError?.[0].message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
