import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { Calendar } from "../../../components/UI";
import { useStyles } from "./style";
import { useCalendarLocationParams } from "../../../components/UI/Calendar/useCalendarLocationParams";
import { useHistory } from "react-router-dom";
import {
  GameStatusFilter,
  GameStatusFormFilters,
} from "../../../components/forms";
import { Game, useGamesQuery } from "../../../generated/apolloComponents";
import { UserContext } from "../../../contexts";
import { ROLES } from "../../../utils";

export const CalendarBox = () => {
  const classes = useStyles();
  const history = useHistory();
  const { date } = useCalendarLocationParams();
  const { me } = useContext(UserContext);

  const [statuses, setStatuses] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const { data } = useGamesQuery({
    variables: {
      filter: {
        startDate: new Date().toString(),
        ...(statuses.length ? { status: statuses } : {}),
        ...(ROLES.isManager(me) ? { userId: me?.id } : {}),
      },
    },
    errorPolicy: "ignore",
  });

  useEffect(() => {
    const fetchedGames = (data?.getGames?.rows?.filter((el) => !!el) ||
      []) as Game[];

    if (fetchedGames.length) setGames(fetchedGames);
  }, [data]);

  const onFilter = async (data: GameStatusFormFilters) => {
    const statusesArr = Object.entries(data)
      .filter(([_key, value]) => value)
      .map(([key, _value]) => key);

    setStatuses(statusesArr);
  };

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Calendar
            games={games}
            initialDate={date}
            onDateRageChange={(dateInfo) => {
              dateInfo?.start.setDate(dateInfo?.start.getDate() + 10);
              const newYear = dateInfo?.start.getFullYear();
              const newMonth = dateInfo?.start.getMonth();
              if (newYear) history.push(`/calendar/${newYear}/${newMonth}`);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper variant="outlined" className={classes.filtersWrapper}>
            <GameStatusFilter onSubmit={onFilter} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
