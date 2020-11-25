import React, { FC, useState } from "react";

import { Map, TileLayer } from "react-leaflet";
import { MAP } from "../../../constants";
import { DraggableMarker } from "./DraggableMarker";

interface IProps {
  containerClass?: string;
  pos?: LatLng;
  onChange?: (val: LatLng) => void;
  isDraggable?: boolean;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export const MarkerMap: FC<IProps> = ({
  containerClass,
  pos = MAP.DEFAULT_POS,
  onChange,
  isDraggable = true,
}) => {
  const [zoom, setZoom] = useState(MAP.DEFAULT_ZOOM);
  return (
    <Map
      className={containerClass}
      center={pos}
      bounceAtZoomLimits={false}
      onzoomend={(l) => setZoom(l.target.getZoom())}
      onclick={(e) => onChange && onChange(e.latlng)}
      zoom={zoom}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        pos={pos}
        onChange={onChange}
        isDraggable={isDraggable}
      />
    </Map>
  );
};
