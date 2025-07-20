import { useCities } from "../hooks/useCities";

import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  console.log(countries);

  if (isLoading) return <Spinner />;

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
