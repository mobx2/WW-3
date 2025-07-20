// Styles
import styles from "./CityList.module.css";

// Hooks
import { useCities } from "../hooks/useCities";

// Components
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length < 1)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default CityList;
