// Routing
import { useNavigate } from "react-router-dom";

// Custom hooks
import { useAuth } from "../hooks/useAuth";

// React core
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) navigate("/");
  }, [isAuthed, navigate]);

  return isAuthed ? children : null;
}

export { ProtectedRoute };
