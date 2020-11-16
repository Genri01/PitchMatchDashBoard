import React, { FC } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

import { Place } from "../../generated/apolloComponents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "800px",
      margin: "auto",
    },
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

interface ListItemProps {
  name: string;
  value: string;
  divider: boolean;
}

const FieldListItem: FC<ListItemProps> = ({ name, value, divider }) => {
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
          secondary={value}
        />
      </ListItem>
      {divider && <Divider variant="middle" component="li" />}
    </>
  );
};

interface IProps {
  data: Place;
}

export const FieldCard: FC<IProps> = ({ data }: IProps) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.wrapper}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="h5"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {data?.name || "-"}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="middle" component="li" />

        <FieldListItem name="Id" value={data?.id || "-"} divider={true} />
        <FieldListItem
          name="Описание"
          value={data?.description || "-"}
          divider={true}
        />
        <FieldListItem
          name="Адрес"
          value={data?.address || "-"}
          divider={true}
        />
        <FieldListItem
          name="Крытое/открытое"
          value={data?.roof ? "Да" : "Нет"}
          divider={true}
        />
        <FieldListItem
          name="Цена"
          value={data?.price?.toString() || "-"}
          divider={true}
        />
        <FieldListItem
          name="Телефон"
          value={data?.phone || "-"}
          divider={true}
        />
        <FieldListItem name="Email" value={data?.email || "-"} divider={true} />
        <FieldListItem name="Размер" value={data?.size || "-"} divider={true} />
        <FieldListItem
          name="Часы работы"
          value={`${data?.fromTime || ""} - ${data?.toTime || ""}`}
          divider={false}
        />
      </List>
    </Paper>
  );
};
