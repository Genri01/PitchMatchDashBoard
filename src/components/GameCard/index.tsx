import React, { FC, ReactNode } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { Box, Paper, Tooltip } from "@material-ui/core";

import { Game } from "../../generated/apolloComponents";
import { useStyles } from "./style";
import { format } from "date-fns";
import { useGameCard } from "./useGameCard";
import { StatusBadge } from "./StatusBadge";
import { useTranslation } from "react-i18next";

interface ListItemProps {
  name: string;
  divider: boolean;
  value?: string;
  element?: ReactNode;
}

const GameListItem: FC<ListItemProps> = ({ name, value, element, divider }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {name}
              </Typography>
            </React.Fragment>
          }
          secondary={element || value}
        />
      </ListItem>
      {divider && <Divider variant="middle" component="li" />}
    </>
  );
};

interface IProps {
  data: Game;
}

export const GameCard: FC<IProps> = ({ data }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { accept, decline } = useGameCard(data);

  return (
    <Paper variant="outlined" className={classes.wrapper}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            secondary={
              <React.Fragment>
                <Box className={classes.titleWrapper}>
                  <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {data?.address || "-"}
                  </Typography>

                  <div>
                    <Tooltip title={t("action.cancel") as string}>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        onClick={decline}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("action.confirm") as string}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={accept}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Box>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="middle" component="li" />
        <GameListItem name="Id" value={data?.id || "-"} divider={true} />
        <GameListItem
          name={t("game.fields.description")}
          value={data?.description || "-"}
          divider={true}
        />
        <GameListItem
          name={t("game.fields.dateAndTime")}
          value={
            data?.startDate
              ? format(new Date(data.startDate), "yyyy-MM-dd hh:mm")
              : "-"
          }
          divider={true}
        />
        <GameListItem
          name={t("game.fields.size")}
          value={data?.totalMembers?.toString() || "-"}
          divider={true}
        />
        <GameListItem
          name={t("game.fields.status")}
          element={<StatusBadge status={data?.status || ""} />}
          value={data?.status || "-"}
          divider={true}
        />
        <GameListItem
          name={t("game.fields.price")}
          value={data?.price?.toString() || "-"}
          divider={true}
        />
        <GameListItem
          name={t("game.fields.creator")}
          value={
            data?.user?.firstName
              ? `${data?.user?.firstName} ${data?.user?.lastName}`
              : "-"
          }
          divider={true}
        />
        <GameListItem
          name={t("game.fields.ageFromTo")}
          value={`${data?.ageFrom || ""} - ${data?.ageTo || ""}`}
          divider={false}
        />
      </List>
    </Paper>
  );
};
