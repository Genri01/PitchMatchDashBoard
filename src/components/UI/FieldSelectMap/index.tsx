import { Button, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { LatLng } from "..";
import { MAP } from "../../../constants";
import { Place } from "../../../generated/apolloComponents";
import { MARKER_ICON, HIGHLIGHTED_ICON } from "../MarkerMap/MarkerIcon";

interface IProps {
  containerClass?: string;
  pos?: LatLng;
  onChoose?: (val: Place) => void;
  fields: Place[];
  selectedItem: Place | null | undefined;
  withClusters?: boolean;
}

export const FieldSelectMap: FC<IProps> = ({
  containerClass,
  pos = MAP.DEFAULT_POS,
  onChoose,
  selectedItem,
  fields,
  withClusters = false,
}) => {
  const [zoom, setZoom] = useState(MAP.DEFAULT_ZOOM);

  const markers = (
    <>
      {fields?.length &&
        fields.map((f, idx) =>
          f.point?.location?.coordinates[0] &&
          f.point?.location?.coordinates[1] ? (
            <Marker
              position={f.point.location.coordinates}
              icon={f.id == selectedItem?.id ? HIGHLIGHTED_ICON : MARKER_ICON}
              key={idx}
            >
              <Popup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginBottom: 5 }}>
                    <Typography component="h4" variant="subtitle1">
                      {f.name}
                    </Typography>
                  </div>

                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    style={{ width: 100 }}
                    onClick={() => onChoose && onChoose(f)}
                  >
                    Выбрать
                  </Button>
                </div>
              </Popup>
            </Marker>
          ) : (
            ""
          )
        )}
    </>
  );

  return (
    <Map
      className={containerClass}
      center={pos}
      bounceAtZoomLimits={false}
      onzoomend={(l) => setZoom(l.target.getZoom())}
      zoom={zoom}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {withClusters ? (
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
      ) : (
        markers
      )}
    </Map>
  );
};
