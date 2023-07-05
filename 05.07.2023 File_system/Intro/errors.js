function example() {
  if (true) {
    throw new Error("It's true");
  }

  return "This is a test";
}

try {
  const data = example();
} catch (e) {
  console.log("Error from catch(): ", e);
}

// console.log({ data });
