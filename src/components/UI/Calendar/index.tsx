import React, { FC } from "react";
import FullCalendar, { DatesSetArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Game } from "../../../generated/apolloComponents";
import ruLocale from "@fullcalendar/core/locales/ru";
import enLocale from "@fullcalendar/core/locales/en-gb";
import { format } from "date-fns";
import { getGameStatusBadgeColor } from "../../GameCard/StatusBadge";

import "./style.css";
import { CalendarEventPopup } from "./Popup";
import { useTranslation } from "react-i18next";

interface IProps {
  games: Game[];
  initialDate?: Date;
  onDateRageChange?: (info: DatesSetArg) => void;
}

export const Calendar: FC<IProps> = ({
  games,
  initialDate: defaultInitialDate = undefined,
  onDateRageChange,
}) => {
  const { i18n } = useTranslation();

  const events =
    games?.map((g) => ({
      title: g.address || "Игра",
      date: format(new Date(g.startDate), "yyyy-MM-dd"),
      id: g.id,
      color: getGameStatusBadgeColor(g.status || ""),
      gameInfo: g,
    })) || [];

  const initialDate = defaultInitialDate
    ? format(defaultInitialDate, "yyyy-MM-dd")
    : undefined;

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      locale={i18n.language == "ru" ? ruLocale : enLocale}
      events={events as any}
      initialDate={initialDate}
      eventContent={CalendarEventPopup}
      datesSet={(info) => onDateRageChange && onDateRageChange(info)}
      initialView="dayGridMonth"
    />
  );
};
