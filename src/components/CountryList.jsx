// Hooks
import { useCities } from "../hooks/useCities";

// Styles
import styles from "./CountryList.module.css";

// Components
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList() {
  // Destructure cities and loading state from custom hook
  const { cities, isLoading } = useCities();

  // Extract unique countries from the cities list
  const countries = cities.reduce((arr, city) => {
    // Check if the country already exists in the array
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    // If not, add it to the array with country and emoji
    else return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  // Show a loading spinner while data is being fetched
  if (isLoading) return <Spinner />;

  // Show a message if there are no cities yet
  if (cities.length < 1)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
