import { Dinero, toFormat } from "dinero.js";

function formatMoney(dineroObject: Dinero<number>) {
  return toFormat(
    dineroObject,
    ({ amount, currency }) => `${currency.code} ${amount}`
  );
}

export default formatMoney;
