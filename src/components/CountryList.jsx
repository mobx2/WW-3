import { useCities } from "../hooks/useCities";

import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  console.log(countries);

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
