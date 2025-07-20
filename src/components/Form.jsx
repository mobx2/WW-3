// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// React
import { useEffect, useState } from "react";

// Routing
import { useNavigate, useParams } from "react-router-dom";

// Packages
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styles
import styles from "./Form.module.css";

// Custom Hooks
import { useUrlLocation } from "../hooks/useUrlLocation";
import { useCities } from "../hooks/useCities";

// UI Components
import Spinner from "./Spinner";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";

// Converts a country code to a flag emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Base URL for reverse geocoding API
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  // State for form fields
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  // State for geolocation loading and error handling
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  // Coordinates extracted from the URL
  const { lat, lng } = useUrlLocation();

  // Access city actions from context
  const { createCity } = useCities();

  // Navigation hook from React Router
  const navigate = useNavigate();

  useEffect(() => {
    // IIFE to fetch city data based on latitude and longitude
    async function fetchCityData() {
      try {
        // Reset error and set loading to true before fetching
        setGeoCodingError("");
        setIsGeoLoading(true);

        // Fetch city data from reverse geocoding API
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        // Update state with the fetched city, country, and emoji
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

        // If no city is found in the response, throw an error
        if (!data.city)
          throw new Error(
            "That doesn't seem to be any city, click somewhere else"
          );
      } catch (err) {
        // Handle and store any error that occurs during fetching
        setGeoCodingError(err.message);
      } finally {
        // Always stop the loading state at the end
        setIsGeoLoading(false);
      }
    }

    // Call the fetch function when coordinates change
    fetchCityData();
  }, [lat, lng]); // Re-run when lat or lng changes

  // Handles the form submission for adding a new city
  async function handleAdd(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new city object with the form data
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // Save the new city using context function
    await createCity(newCity);

    // Navigate the user to the cities list page
    navigate("/app/cities");
  }

  // Show a loading spinner while geolocation data is being fetched
  if (isGeoLoading) return <Spinner />;

  // Show an error message if there was a problem with geolocation
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
        <ButtonBack>&larr; Back</ButtonBack>
      </div>
    </form>
  );
}

export default Form;
