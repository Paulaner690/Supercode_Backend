import { arrayNumbers, arrayCars } from "./data.js";

// # NORMALE FUNCTION EXPORTIEREN
// default benötigt man wenn man dem export keinen Namen gegeben hat
function sortCars() {
  const sortedCars = arrayCars.sort();
  return sortedCars;
}
export default sortCars;

// # ALS ARROW FUNCTION EXPORTIEREN
// wenn durch const/let ein Name vergeben wurde, brauche ich kein default
export const sortNumbers = () => {
  const sortedNumber = arrayNumbers.sort((a, b) => a - b);
  return sortedNumber;
};
