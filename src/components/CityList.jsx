import { useCities } from "../hooks/useCities";

function CityList() {
  const { cities } = useCities();

  console.log(cities);
  return <div></div>;
}

export default CityList;
