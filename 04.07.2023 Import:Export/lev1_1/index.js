// ohne Klammern, da es als default exportiert wurde
import sortCars from "./function.js";
// Mit Klammer, da die Funktion einen Namen bekommen hat
import { sortNumbers } from "./function.js";

console.log(sortCars());
console.log(sortNumbers());
