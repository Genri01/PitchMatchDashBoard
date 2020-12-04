import { Box, Button, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Calendar } from "../../../components/UI";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useStyles } from "./style";
import { GamesContext } from "../../../contexts";

export const CalendarBox = () => {
  const classes = useStyles();
  const { games } = useContext(GamesContext);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.calendarWrapper}>
        <Calendar games={games} />
      </Box>
      <Paper variant="outlined" className={classes.filtersWrapper}>
        <Typography
          component="span"
          variant="h5"
          color="textPrimary"
          className={classes.filtersTitle}
        >
          Фильтр
        </Typography>
        <Box className={classes.filtersContainer}>
          <FormControlLabel
            className="MuiTextField-root"
            control={<Checkbox id="roof-input" color="primary" name="roof" />}
            label="Новые"
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={<Checkbox id="roof-input" color="primary" name="roof" />}
            label="Подтвержденные"
          />
          <FormControlLabel
            className="MuiTextField-root"
            control={<Checkbox id="roof-input" color="primary" name="roof" />}
            label="Отклоненные"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.filterButton}
          >
            Фильтр
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
