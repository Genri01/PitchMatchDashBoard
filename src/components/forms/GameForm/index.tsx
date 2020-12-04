import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { Avatar } from "@material-ui/core";

import { useStyles } from "./style";
import { useGameForm } from "./useGameForm";
import { FieldSelectMap, FormSelect } from "../../UI";
import { FormProvider } from "react-hook-form";

export const GameForm = () => {
  const classes = useStyles();
  const {
    register,
    onSubmit,
    formMethods,
    fields,
    field,
    setField,
  } = useGameForm();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>{<AddCircleIcon />}</Avatar>
      <Typography component="h1" variant="h5">
        Создать игру
      </Typography>
      <FormProvider {...formMethods}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <div>
            <TextField
              id="description"
              label="Описание"
              multiline
              rows={4}
              className={classes.fullwidthField}
              variant="outlined"
              name="description"
              inputRef={register}
            />
          </div>
          <div>
            <FormSelect
              name="reg"
              label="Регистрация"
              className={classes.field}
              options={[
                { id: "opened", label: "Открыта" },
                { id: "closed", label: "Закрыта" },
                { id: "byRequest", label: "По запросу" },
              ]}
            />

            <TextField
              className={classes.field}
              label="Цена"
              id="price"
              variant="outlined"
              name="price"
              type="number"
              inputRef={register}
            />
          </div>
          <div>
            <TextField
              className={classes.field}
              label="Возраст от"
              id="ageFrom"
              variant="outlined"
              name="ageFrom"
              type="number"
              inputRef={register}
            />
            <TextField
              className={classes.field}
              label="Возраст до"
              id="ageTo"
              variant="outlined"
              name="ageTo"
              type="number"
              inputRef={register}
            />
          </div>
          <div>
            <FormSelect
              name="gender"
              label="Пол"
              className={classes.field}
              options={[
                { id: "", label: "Любой" },
                { id: "m", label: "Мужской" },
                { id: "f", label: "Женский" },
              ]}
            />

            <FormSelect
              name="size"
              label="Количество игроков"
              className={classes.field}
              options={[
                { id: 4, label: "4х4" },
                { id: 5, label: "5х5" },
                { id: 6, label: "6х6" },
                { id: 7, label: "7х7" },
                { id: 8, label: "8х8" },
                { id: 9, label: "9х9" },
              ]}
            />
          </div>

          <div style={{ display: "flex" }}>
            <TextField
              className={classes.field}
              id="datetime-local"
              label="Дата и время"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              inputRef={register}
            />
            <Autocomplete
              className={classes.field}
              id="address"
              options={fields}
              getOptionLabel={(f) => f?.address || ""}
              onChange={(_e, f) => setField(f)}
              renderInput={(params) => {
                (params.inputProps as any).value = field?.address;

                return (
                  <TextField
                    {...params}
                    value={"SHIT"}
                    label="Поле/Адрес"
                    variant="outlined"
                  />
                );
              }}
            />
          </div>

          <div className={classes.mapWrapper}>
            <FieldSelectMap
              containerClass={classes.mapContainer}
              onChoose={setField}
              selectedItem={field}
              fields={fields}
              pos={field?.point?.location.coordinates}
              withClusters={true}
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
      </FormProvider>
    </div>
  );
};
