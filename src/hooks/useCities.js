import { useContext } from "react";
import CitiesContext from "../contexts/CitiesContext";

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useAuth was used outside AuthProvider");

  return context;
}

export { useCities };
