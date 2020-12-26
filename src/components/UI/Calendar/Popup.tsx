import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import i18next from "i18next";
import React, { FC } from "react";

import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import { Game } from "../../../generated/apolloComponents";

export const CalendarEventPopup: FC = (eventInfo: any) => {
  const game: Game = eventInfo?.event?._def?.extendedProps?.gameInfo || {};

  return (
    <>
      <Popup
        trigger={
          <span
            style={{
              width: "100%",
              display: "block",
              cursor: "pointer",
            }}
          >
            {eventInfo.event.title}
          </span>
        }
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {game?.address || "Игра"}
            </Typography>
            <Typography color="textSecondary" style={{}}>
              {i18next.t("game.fields.size")}: {game?.totalMembers}
            </Typography>
            <Typography color="textSecondary" style={{}}>
              {i18next.t("game.fields.price")}: {game?.price || "-"}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                marginTop: "10px",
              }}
            >
              {game?.description || ""}
            </Typography>
          </CardContent>

          <CardActions>
            <Link
              to={`/game/${game.id}`}
              style={{
                outline: "none",
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button size="small" disableRipple color="primary">
                {i18next.t("action.details")}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Popup>
    </>
  );
};
