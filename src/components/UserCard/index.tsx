import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from "@material-ui/core";

import { UserStats } from "../../generated/apolloComponents";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";

interface ListItemProps {
  name: string;
  value: string;
  divider: boolean;
}

const UserListItem: FC<ListItemProps> = ({ name, value, divider }) => {
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
  data: UserStats;
}

export const UserCard: FC<IProps> = ({ data }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const imgUrl = data.user?.avatar?.url;
  const { user } = data;

  return (
    <Paper variant="outlined" className={classes.wrapper}>
      <List className={classes.root}>
        {imgUrl && (
          <>
            <ListItem alignItems="flex-start">
              <img src={imgUrl} className={classes.profilePic} />
            </ListItem>
          </>
        )}
        <ListItem alignItems="flex-start">
          <ListItemText
            secondary={
              <React.Fragment>
                <Box className={classes.titleWrapper}>
                  <Typography
                    component="span"
                    variant="h4"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {user
                      ? `${user?.lastName || ""} ${user?.firstName || ""}`
                      : "-"}
                  </Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider
          variant="middle"
          component="li"
          style={{
            marginTop: "30px",
          }}
        />

        <UserListItem name="Id" value={user?.id || "-"} divider={true} />
        <UserListItem
          name={t("user.fields.attendGames")}
          value={data.attendGames?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.orgGames")}
          value={data.orgGames?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.birthday")}
          value={user?.birthday ? new Date(user.birthday).toDateString() : "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.gender")}
          value={user?.gender || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.prefferedPosition")}
          value={user?.prefferedPosition || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.bannedAt")}
          value={user?.bannedAt || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.banReason")}
          value={user?.banReason || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.ratingScore")}
          value={user?.ratingScore?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.ratingTotal")}
          value={user?.ratingTotal?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.attendyScore")}
          value={user?.attendyScore?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.attendyTotal")}
          value={user?.attendyTotal?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.checkinRating")}
          value={user?.checkinRating?.toString() || "-"}
          divider={true}
        />
        <UserListItem
          name={t("user.fields.commercialFrom")}
          value={
            user?.commercialFrom
              ? new Date(user.commercialFrom).toDateString()
              : "-"
          }
          divider={false}
        />
      </List>
    </Paper>
  );
};
