import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth was used outside AuthProvider");

  return context;
}

export { useAuth };
