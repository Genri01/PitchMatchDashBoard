import React, { FC } from "react";
import { Marker } from "react-leaflet";
import { MARKER_ICON } from "./MarkerIcon";
import { LatLng } from ".";
import { MAP } from "../../../constants";

interface IProps {
  pos?: LatLng;
  onChange?: (val: LatLng) => void;
  isDraggable?: boolean;
}

export const DraggableMarker: FC<IProps> = ({
  pos = MAP.DEFAULT_POS,
  onChange,
  isDraggable = true,
}) => {
  return (
    <Marker
      draggable={isDraggable}
      ondragend={(e) => {
        const v = e.target.getLatLng();
        onChange && onChange(v);
      }}
      position={pos}
      icon={MARKER_ICON}
    />
  );
};
