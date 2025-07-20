import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem() {
  return (
    <li>
      <NavLink className={styles.cityItem}>city</NavLink>
    </li>
  );
}

export default CityItem;
