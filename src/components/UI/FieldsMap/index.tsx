import { Button, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { LatLng } from "..";
import { MAP } from "../../../constants";
import { Place } from "../../../generated/apolloComponents";
import { MARKER_ICON } from "../MarkerMap/MarkerIcon";

interface IProps {
  containerClass?: string;
  pos?: LatLng;
  onChoose?: (val: Place) => void;
  fields: Place[];
  withClusters?: boolean;
}

export const FieldsMap: FC<IProps> = ({
  containerClass,
  pos = MAP.DEFAULT_POS,
  onChoose,
  fields,
  withClusters = false,
}) => {
  const { t } = useTranslation();

  const [zoom, setZoom] = useState(4 || MAP.DEFAULT_ZOOM);

  const markers = (
    <>
      {fields?.length &&
        fields.map((f, idx) =>
          f?.point?.location?.coordinates[0] &&
          f?.point?.location?.coordinates[1] ? (
            <Marker
              position={f.point.location.coordinates}
              icon={MARKER_ICON}
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
                    {t("action.goTo")}
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
