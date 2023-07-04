import { names, numbers } from "./data.js";

// # Gib nur das ERSTE Element des Arrays zurück
// oder shift()
export const firstElementNames = () => {
  const firstName = names[0];
  return firstName;
};

export const firstElementNumber = () => {
  const firstNumber = numbers[0];
  return firstNumber;
};

// # Gib alle AUSSER dem letzten Element des Arrays zurück

export const lastElementName = () => {
  //   names.pop();
  return names.slice(0, -1);
};

export const lastElementNumber = () => {
  //   numbers.pop();
  return numbers.slice(0, -1);
};

// # Gib nur das LETZTE Element des Arrays zurück
// oder pop()
export const justLastElementName = () => {
  return names.slice(-1);
};

export const justLastElementNumber = () => {
  return numbers.slice(-1);
};

// # Gib ALLE AUSSER DEM ERSTEN Element des Arrays zurück
export const justFirstName = () => {
  return names.slice(1);
};

export const justFirstNumber = () => {
  return numbers.slice(1);
};

// # schreibe eine function, die ein bestimmtes Element komplett aus deinem Array entfernt
// ! Parameter beachten
export const removeElementName = (array, element) => {
  return array.filter((item) => item !== element);
};

// ! Es werden alle Elemente des Arrays durchgegangen (wie map) und NUR die numbers zurückgegen, die NICHT dem element entsprechen
export const removeElementNumber = (array, element) => {
  return array.filter((number) => number !== element);
};

// # Gib ein Array zurück, das nur aus einzigartigen Werten besteht. Entferne die doppelten Elemente!
// ! Parameter beachten
export const uniqueNumbers = (numbers) => {
  return [...new Set(numbers)];
};

// # Gib die Summe des Arrays “numbers” zurück.
// ! Parameter beachten
export const summe = (numbers) => {
  return numbers.reduce((a, b) => a + b, 0);
};

// # Die function bekommt zwei Parameter übergeben. Gib eine zufällige Zahl zurück, die zwischen diesen beiden liegt
export const randomNumber = (a, b) => {
  return Math.round(Math.random() * (b - a)) + a;
  //   return Math.round(Math.random() * 10);
};

// # Erstelle eine function, der ein String übergeben wird. Sie soll den ersten Buchstaben in einen Großbuchstaben umwandelt.
export const firstBigLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// # Erstelle eine function, der ein String übergeben wird. Sie soll den gesamten String in Großbuchstaben umwandeln
export const BigLetter = (string) => {
  return string.toUpperCase();
};

// # Erstelle eine function, mit zwei Parametern. Sie soll überprüfen ob der letzte Buchstabe von Parameter 1 mit dem Parameter 2 überein stimmt
export const lastLetter = (string, letter) => {
  const lastLetter = string.charAt(string.length - 1).toLowerCase();
  return lastLetter === letter.toLowerCase();
};
