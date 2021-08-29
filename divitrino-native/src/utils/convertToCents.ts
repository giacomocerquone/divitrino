const convertToCents = (amount: string | number) => {
  const castedAmount =
    typeof amount === "string" ? parseFloat(amount.replace(",", ".")) : amount;
  const cents = castedAmount * 100;

  return Math.round(cents);
};

export default convertToCents;
