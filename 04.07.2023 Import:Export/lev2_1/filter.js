import { data } from "./cities.js";

// # Einwohner über 100.000 ausgeben
export const morePopulation = () => {
  return data.filter((city) => city.population > 100000);
};

// # Einwohner unter 100.000 ausgeben
export const lessPopulation = () => {
  return data.filter((city) => city.population < 100000);
};

// oder Parameter "data" in den Funktionen übergeben und dann {data} nur in der main.js importieren
