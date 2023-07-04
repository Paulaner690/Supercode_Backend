import { names, numbers } from "./data.js";

import { firstElementNames } from "./function.js";
console.log(firstElementNames());

import { firstElementNumber } from "./function.js";
console.log(firstElementNumber());

import { lastElementName } from "./function.js";
console.log(lastElementName());

import { lastElementNumber } from "./function.js";
console.log(lastElementNumber());

import { justLastElementName } from "./function.js";
console.log(justLastElementName());

import { justLastElementNumber } from "./function.js";
console.log(justLastElementNumber());

import { justFirstName } from "./function.js";
console.log(justFirstName());

import { justFirstNumber } from "./function.js";
console.log(justFirstNumber());

// ! Parameter beachten
import { removeElementName } from "./function.js";
console.log(removeElementName(names, "Eric"));

// ! Parameter beachten
import { removeElementNumber } from "./function.js";
console.log(removeElementNumber(numbers, 6));

// ! Parameter beachten
import { uniqueNumbers } from "./function.js";
console.log(uniqueNumbers(numbers));

// ! Parameter beachten
import { summe } from "./function.js";
console.log(summe(numbers));

// ! Parameter beachten
import { randomNumber } from "./function.js";
console.log(randomNumber(1, 10));

// ! Parameter beachten
import { firstBigLetter } from "./function.js";
console.log(firstBigLetter("haaaaaallo"));

// ! Parameter beachten
import { BigLetter } from "./function.js";
console.log(BigLetter("haaaaaallo"));

// ! Parameter beachten
import { lastLetter } from "./function.js";
console.log(lastLetter("Hallo", "o"));
console.log(lastLetter("Hallo", "q"));
