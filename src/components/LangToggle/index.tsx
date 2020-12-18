import React, { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ruFlag from "../../assets/images/russia-flag-round-icon-32.png";
import enFlag from "../../assets/images/united-kingdom-flag-round-icon-32.png";

interface IProps {
  style?: CSSProperties;
}

export const LangToggle: FC<IProps> = ({}) => {
  const { i18n } = useTranslation();

  return (
    <ToggleButtonGroup
      size="small"
      value={i18n.language}
      exclusive
      onChange={(_e, val) => i18n.changeLanguage(val)}
    >
      <ToggleButton value="en">
        <img src={enFlag} alt="En" width={16} height={16} />
      </ToggleButton>
      <ToggleButton value="ru">
        <img src={ruFlag} alt="Ru" width={16} height={16} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
