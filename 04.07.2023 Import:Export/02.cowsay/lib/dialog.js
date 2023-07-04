import cowsay from "cowsay";

const kidsEyes = "..";
const motherEyes = "OO";

export const hello = () => {
  console.log(
    cowsay.say({ text: "Should I get up today?", e: kidsEyes }),
    cowsay.think({ text: "But I hate Mondays", e: kidsEyes }),
    cowsay.say({ text: "Naaaah doesn't worth it.", e: kidsEyes }),
    cowsay.say({ text: "GET THE FUCK UP", e: motherEyes })
  );
};
