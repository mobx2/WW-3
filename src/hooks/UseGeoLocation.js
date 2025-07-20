import { useState } from "react";

// Custom hook to get user's current geolocation
export default function useGeolocation(defaultPosition = null) {
  // Loading state during geolocation fetch
  const [isLoading, setIsLoading] = useState(false);
  // Position state stores latitude and longitude
  const [position, setPosition] = useState(defaultPosition);
  // Error state to capture geolocation errors
  const [error, setError] = useState(null);

  // Function to request current position from browser
  function getPosition() {
    // Check if browser supports geolocation API
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);

    // Call browser API to get current position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // On success, update position state with lat/lng
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        // On error, set error message state
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  // Return state and function for components to use
  return { isLoading, position, error, getPosition };
}
