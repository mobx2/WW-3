import { createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:9001";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    case "reject":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Something went Wrong");

        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "reject", payload: err.message || "Unknown error" });
      }
    }
    getCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext };
