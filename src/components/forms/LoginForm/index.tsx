import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "./styles";
import { ViewerCredentialsInput } from "../../../generated/apolloComponents";
import { UserContext } from "../../../contexts";
import { useTranslation } from "react-i18next";
import { Snackbar } from "@material-ui/core";

export const LoginForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm();
  const { login } = useContext(UserContext);
  const [serverError, setServerError] = useState<any>();

  const onSubmit = async (data: ViewerCredentialsInput) => {
    try {
      await login(data);
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("form.login.title")}
      </Typography>
      <form
        className={classes.form}
        noValidate
        // @ts-ignore
        onSubmit={handleSubmit<ViewerCredentialsInput>(onSubmit)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label={t("form.login.login")}
          name="login"
          inputRef={register}
          defaultValue="+79284609803"
          autoComplete="login"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          inputRef={register}
          defaultValue="123qweasd"
          label={t("form.login.password")}
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t("form.login.submit")}
        </Button>
      </form>
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
          {serverError}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
