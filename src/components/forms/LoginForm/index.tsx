import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import { ViewerCredentialsInput } from "../../../generated/apolloComponents";
import { UserContext } from "../../../contexts";

export const LoginForm = () => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const { login } = useContext(UserContext);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Войти в аккаунт
      </Typography>
      <form
        className={classes.form}
        noValidate
        // @ts-ignore
        onSubmit={handleSubmit<ViewerCredentialsInput>(login)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
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
          label="Пароль"
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
          Войти
        </Button>
      </form>
    </div>
  );
};
