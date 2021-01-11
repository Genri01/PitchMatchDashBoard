import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormSelect } from "../../../../components/UI";
import { UserProfile } from "../../../../generated/apolloComponents";
import { ROLES } from "../../../../utils";
import { useStyles } from "./styles";
import { useAddUser } from "./useAddUser";

interface IProps {
  onAdd?: Function;
}

export const AddUser: FC<IProps> = ({ onAdd }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    formMethods,
    onSubmit,
    users,
    formState,
    user,
    setUser,
    availableRoles,
    userSearch,
    setUserSearch,
  } = useAddUser(onAdd);

  return (
    <Paper variant="outlined" className={classes.wrapper}>
      <Typography
        component="span"
        variant="h5"
        color="textPrimary"
        className={classes.title}
      >
        {t("form.addAccessUser.title")}
      </Typography>
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                id="user"
                options={users}
                getOptionLabel={(f) =>
                  `${f?.lastName || ""} ${f?.firstName || ""}`
                }
                onChange={(_e, f) => {
                  setUser(f as UserProfile);
                  setUserSearch(`${f?.lastName || ""} ${f?.firstName || ""}`);
                }}
                renderInput={(params) => {
                  (params.inputProps as any).value = userSearch;

                  return (
                    <TextField
                      {...params}
                      label={t("form.addAccessUser.fieldAddUser")}
                      variant="outlined"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      required
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormSelect
                name="role"
                label={t("user.fields.role")}
                defaultValue={ROLES.MANAGER}
                options={availableRoles
                  .filter((r) => r != ROLES.USER)
                  .map((r) => ({
                    id: r,
                    label: t(`shared.role.${r}`),
                  }))}
                rules={{ required: t("error.required") as string }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formState.isValid || !user}
              >
                {t("action.add")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Paper>
  );
};
