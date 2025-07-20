import { createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
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

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };

    case "reject":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unknown");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Something went Wrong");

        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    getCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();

      if (!res.ok) throw new Error("Something went wrong");

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      console.error("There was an error loading city...");
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "reject",
        payload: "There was an error creating  city...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "reject",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
