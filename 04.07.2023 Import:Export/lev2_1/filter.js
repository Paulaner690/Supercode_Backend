// # Einwohner über 100.000 ausgeben
export const morePopulation = (data) => {
  return data.filter((city) => city.population > 100000);
};

// # Einwohner unter 100.000 ausgeben
export const lessPopulation = (data) => {
  return data.filter((city) => city.population < 100000);
};
