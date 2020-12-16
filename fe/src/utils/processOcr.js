import { v4 as uuidv4 } from "uuid";
import convertToCents from "./convertToCents";

const processOcr = (res) => {
  const {
    data: { lines },
  } = res;

  const resultedProds = lines.map((l) => {
    const words = l.words.slice(0, l.words.length - 2).map((word) => word.text);
    const price = l.words.slice(-1).map((word) => word.text)[0];
    const amount = convertToCents(price);

    return {
      name: words.join(" "),
      amount: isNaN(amount) ? 0 : amount / 100,
      id: uuidv4(),
    };
  });

  return resultedProds.filter((prod) => prod);
};

export default processOcr;
