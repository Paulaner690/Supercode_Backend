const arrayMap = (arr, mapFn) => {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    // mapFn benutzen
    const mapFnResult = mapFn(element, i, arr);
    // Resultat in das neue array pushen
    newArr.push(mapFnResult);
  }

  return newArr;
};

[1, 2, 3].map((num, index, array) => num * 2);
const result = arrayMap([1, 2, 3], (num) => num * 2);
console.log(result);
/**
 * Test
 */
if (result[0] === 2 && result[1] === 4 && result[2] === 6) {
  console.log("Yes!!");
} else {
  console.log("Noo way jose");
}

// const arrayMapPerf = (arr, mapFn) => {
//   const newArr = new Array(arr.length);

//   for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     // mapFn benutzen
//     const mapFnResult = mapFn(element);
//     // Resultat in das neue array pushen
//     newArr[i] = mapFnResult;
//   }

//   return newArr;
// };
