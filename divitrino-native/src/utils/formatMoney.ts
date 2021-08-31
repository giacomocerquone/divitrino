import { Dinero, toFormat } from "dinero.js";

const symbols: any = {
  USD: "$",
  EUR: "€",
};

function formatMoney(dineroObject: Dinero<number>) {
  return toFormat(
    dineroObject,
    ({ amount, currency }) =>
      `${symbols[currency.code] || currency.code} ${amount}`
  );
}

export default formatMoney;
