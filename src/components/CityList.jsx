import styles from "./CityList.module.css";
import { useCities } from "../hooks/useCities";
import CityItem from "./CityItem";

function CityList() {
  const { cities } = useCities();

  console.log(cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default CityList;
