// Import hook to read URL query parameters
import { useSearchParams } from "react-router-dom";

// Custom hook to get 'lat' and 'lng' from URL query parameters
function useUrlLocation() {
  // Get current search params object from URL
  const [searchParams] = useSearchParams();

  // Extract 'lat' and 'lng' values from URL params
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Return the coordinates as an object
  return { lat, lng };
}

export { useUrlLocation };
