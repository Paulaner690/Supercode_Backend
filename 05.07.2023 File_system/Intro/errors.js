function example() {
  if (true) {
    throw new Error("It's true");
  }

  return "This is a Test";
}

let data;
try {
  data = example();
} catch (e) {
  console.log("Error from catch(): ", e);
}

// Data ist undefined denn example wirft einen
// Error
console.log({ data });
