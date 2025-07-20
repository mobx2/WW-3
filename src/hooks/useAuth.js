// React hook
import { useContext } from "react";

// AuthContext
import { AuthContext } from "../contexts/FakeAuthContext";

// Custom hook to get auth context
function useAuth() {
  // Access the auth context value
  const context = useContext(AuthContext);

  // Throw error if hook used outside AuthProvider
  if (context === undefined)
    throw new Error("useAuth was used outside AuthProvider");

  // Return auth context value
  return context;
}

export { useAuth };
