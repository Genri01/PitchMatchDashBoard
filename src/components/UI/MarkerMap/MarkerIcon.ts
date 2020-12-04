import L from "leaflet";

const svgString = `<svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 32C18.3637 24.6266 26 21.7817 26 13.037C26 5.56644 20.4493 0 13 0C5.55305 0 0 5.56644 0 13.0371C0 21.7805 7.63875 24.629 13 32ZM13 9.97139C14.9531 9.97139 16.5455 11.5682 16.5455 13.527C16.5455 15.4849 14.9531 17.0825 13 17.0825C11.0468 17.0825 9.45454 15.4849 9.45454 13.527C9.45454 11.5682 11.0468 9.97139 13 9.97139Z" fill="#3882D0"/>
</svg>
`;

const highlightedSvgString = `<svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 32C18.3637 24.6266 26 21.7817 26 13.037C26 5.56644 20.4493 0 13 0C5.55305 0 0 5.56644 0 13.0371C0 21.7805 7.63875 24.629 13 32ZM13 9.97139C14.9531 9.97139 16.5455 11.5682 16.5455 13.527C16.5455 15.4849 14.9531 17.0825 13 17.0825C11.0468 17.0825 9.45454 15.4849 9.45454 13.527C9.45454 11.5682 11.0468 9.97139 13 9.97139Z" fill="#ff4242"/>
</svg>
`;

export const MARKER_ICON = L.icon({
  iconUrl: encodeURI("data:image/svg+xml," + svgString).replace("#", "%23"),
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

export const HIGHLIGHTED_ICON = L.icon({
  iconUrl: encodeURI("data:image/svg+xml," + highlightedSvgString).replace(
    "#",
    "%23"
  ),
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});
