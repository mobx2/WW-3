import styles from "./CityList.module.css";
import { useCities } from "../hooks/useCities";

import CityItem from "./CityItem";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default CityList;
