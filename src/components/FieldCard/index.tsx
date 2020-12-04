import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { Box, Paper, Tooltip } from "@material-ui/core";

import { Place } from "../../generated/apolloComponents";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { hoursMinsFormatter } from "../../utils";
import { MarkerMap } from "../UI/MarkerMap";
import { ImageBrowser } from "../UI";

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
  const history = useHistory();
  const imgs = data?.files;

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
                    {data?.name || "-"}
                  </Typography>
                  <Tooltip title="Редактировать">
                    <IconButton
                      aria-label="edit"
                      onClick={() => history.push(`/field/edit/${data.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="middle" component="li" />
        {imgs && (
          <ListItem alignItems="flex-start">
            <ImageBrowser files={imgs} />
          </ListItem>
        )}

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
        {data?.point && (
          <ListItem alignItems="flex-start">
            <MarkerMap
              containerClass={classes.mapContainer}
              pos={{
                lat: data.point?.location?.coordinates[0],
                lng: data.point?.location?.coordinates[1],
              }}
              isDraggable={false}
            />
          </ListItem>
        )}

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
          value={`${
            data?.fromTime ? hoursMinsFormatter(data.fromTime) : ""
          } - ${data?.toTime ? hoursMinsFormatter(data.toTime) : ""}`}
          divider={false}
        />
      </List>
    </Paper>
  );
};
