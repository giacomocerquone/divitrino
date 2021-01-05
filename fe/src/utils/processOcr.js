import { v4 as uuidv4 } from "uuid";
import convertToCents from "./convertToCents";

function ucFirst(str) {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

const processOcr = (res) => {
  const {
    data: { lines },
  } = res;

  const resultedProds = lines.map((l) => {
    const words = l.words.slice(0, l.words.length - 2).map((word) => word.text);
    const price = l.words.slice(-1).map((word) => word.text)[0];
    const amount = convertToCents(price);

    return {
      name: ucFirst(words.join(" ").toLowerCase()),
      amount: isNaN(amount) ? 0 : amount / 100,
      id: uuidv4(),
    };
  });

  return resultedProds.filter((prod) => prod);
};

export default processOcr;
