// Styles
import styles from "./Map.module.css";

// Map Components from react-leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";

// React core
import { useEffect, useState } from "react";

// Custom Hooks
import { useCities } from "../hooks/useCities";
import { useUrlLocation } from "../hooks/useUrlLocation";
import useGeolocation from "../hooks/UseGeoLocation";

// Routing
import { useNavigate } from "react-router-dom";

// UI Components
import Button from "./Button";

function Map() {
  // Get the list of cities from context
  const { cities } = useCities();

  // Local state for the map’s center position [latitude, longitude]
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Extract coordinates (lat & lng) from the URL query string
  const { lat: mapLat, lng: mapLng } = useUrlLocation();

  // Update the map center when URL coordinates change
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // Destructure geolocation state and function from custom hook
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  return (
    // Container div for the map and button
    <div className={styles.mapContainer}>
      {/* Button to trigger getting the user's current geolocation */}
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Laddong.." : "Use your location"}
      </Button>

      {/* Main map container from react-leaflet */}
      <MapContainer
        className={styles.map}
        center={[mapLat || 40, mapLng || 0]} // Initial center of the map
        zoom={6} // Default zoom level
        scrollWheelZoom={true} // Allow zooming with mouse wheel
      >
        {/* OpenStreetMap tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Render markers for each city in the list */}
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* Custom component to recenter map based on new coordinates */}
        <ChangeCenter position={mapPosition} />

        {/* Custom component to detect click events on the map */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Change map center when position updates
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Navigate to form on map click with lat/lng
function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
