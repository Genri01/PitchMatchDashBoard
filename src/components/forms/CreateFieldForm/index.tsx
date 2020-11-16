import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Avatar, Checkbox, FormControlLabel } from "@material-ui/core";

import { useStyles } from "./style";
import {
  PlaceInput,
  useCreateFieldMutation,
} from "../../../generated/apolloComponents";
import { UserContext } from "../../../contexts";

export const CreateFieldForm = () => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  const { me } = useContext(UserContext);
  const [createField] = useCreateFieldMutation();

  const onSubmit = async (data: PlaceInput) => {
    try {
      const res = await createField({
        variables: {
          input: {
            ...data,
            price: typeof data.price == "string" ? parseFloat(data.price) : 0,
            userId: me!.id,
          },
        },
      });
      const resId = res.data?.upsertPlace?.id;
      if (resId) {
        history.push(`/field/${resId}`);
      }
    } catch (err) {}
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AddCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Создать поле
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit<PlaceInput>(onSubmit)}
      >
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
            control={<Checkbox inputRef={register} name="roof" />}
            label="Крытое"
          />
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Создать
        </Button>
      </form>
    </div>
  );
};
