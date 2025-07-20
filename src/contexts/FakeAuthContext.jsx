import { createContext, useReducer } from "react";

// Create AuthContext to share auth state across components
const AuthContext = createContext();

// A fake user object to simulate authentication (for demo/testing)
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Initial state of the auth context
const initialState = {
  user: null, // No user initially logged in
  isAuthed: false, // Authentication status
};

// Reducer function to manage state changes based on action types
function reducer(state, action) {
  switch (action.type) {
    case "login":
      // Set the user data and mark as authenticated
      return {
        ...state,
        user: action.payload,
        isAuthed: true,
      };

    case "logout":
      // Reset state to initial (logged out)
      return initialState;

    default:
      // Throw error on unknown actions for debugging
      throw new Error("Unknown action type");
  }
}

// AuthProvider component wraps parts of the app that need auth context
function AuthProvider({ children }) {
  // useReducer hook to handle auth state and dispatch actions
  const [{ user, isAuthed }, dispatch] = useReducer(reducer, initialState);

  // Login function checks credentials and dispatches login action
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  // Logout function dispatches logout action to clear auth state
  function logout() {
    dispatch({ type: "logout" });
  }

  // Provide state and functions to child components via context
  return (
    <AuthContext.Provider value={{ user, isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
