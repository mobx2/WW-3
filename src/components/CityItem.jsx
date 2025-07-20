// React Router
import { NavLink, useNavigate } from "react-router-dom";

// Styles
import styles from "./CityItem.module.css";

// Custom Hooks
import { useCities } from "../hooks/useCities";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  // Destructure city properties for easy access
  const { cityName, emoji, date, id, position } = city;

  // Get delete function and currentCity from custom Cities context
  const { deleteCity, currentCity } = useCities();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle city deletion and navigate back to cities list
  async function handleDelete(e) {
    e.preventDefault(); // Prevent default link or button behavior
    await deleteCity(id); // Delete the selected city from state and API
    navigate("/app/cities"); // Redirect to the cities list page
  }

  return (
    <li>
      <NavLink
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </NavLink>
    </li>
  );
}

export default CityItem;
