import React, { FC } from "react";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { getGameStatusBadgeColor } from "../../GameCard/StatusBadge";
import { useStyles } from "./style";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface GameStatusFormFilters {
  new: boolean;
  finished: boolean;
  confirmed: boolean;
  cancelled: boolean;
}

interface IProps {
  onSubmit: (data: GameStatusFormFilters) => void;
}

export const GameStatusFilter: FC<IProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm();

  return (
    <>
      <Typography
        component="span"
        variant="h5"
        color="textPrimary"
        className={classes.filtersTitle}
      >
        {t("form.calendarFilter.filter")}
      </Typography>
      <Box className={classes.filtersContainer}>
        <form
          onSubmit={handleSubmit<GameStatusFormFilters>(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            className="MuiTextField-root"
            control={
              <Checkbox
                id="new-input"
                name="new"
                defaultChecked
                inputRef={register}
                style={{
                  color: getGameStatusBadgeColor("new"),
                }}
              />
            }
            label={t("form.calendarFilter.new")}
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={
              <Checkbox
                id="confirmed-input"
                name="confirmed"
                defaultChecked
                inputRef={register}
                style={{
                  color: getGameStatusBadgeColor("confirmed"),
                }}
              />
            }
            label={t("form.calendarFilter.confirmed")}
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={
              <Checkbox
                id="cancelled-input"
                name="cancelled"
                defaultChecked
                inputRef={register}
                style={{
                  color: getGameStatusBadgeColor("cancelled"),
                }}
              />
            }
            label={t("form.calendarFilter.rejected")}
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={
              <Checkbox
                id="finished-input"
                name="finished"
                defaultChecked
                inputRef={register}
                style={{
                  color: "gray",
                }}
              />
            }
            label={t("form.calendarFilter.finished")}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.filterButton}
          >
            {t("form.calendarFilter.applyFilter")}
          </Button>
        </form>
      </Box>
    </>
  );
};
