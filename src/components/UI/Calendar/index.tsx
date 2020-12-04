import React, { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Game } from "../../../generated/apolloComponents";
import ruLocale from "@fullcalendar/core/locales/ru";
import { format } from "date-fns";
import { getGameStatusBadgeColor } from "../../GameCard/StatusBadge";

import "./style.css";
import { CalendarEventPopup } from "./Popup";

interface IProps {
  games: Game[];
}

export const Calendar: FC<IProps> = ({ games }) => {
  const events =
    games?.map((g) => ({
      title: g.address || "Игра",
      date: format(new Date(g.startDate), "yyyy-MM-dd"),
      id: g.id,
      color: getGameStatusBadgeColor(g.status || ""),
      gameInfo: g,
    })) || [];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      locale={ruLocale}
      events={events as any}
      eventContent={CalendarEventPopup}
      initialView="dayGridMonth"
    />
  );
};
