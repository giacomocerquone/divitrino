const convertToCents = (amount: string | number) => {
  const castedAmount =
    typeof amount === "string" ? parseFloat(amount.replace(",", ".")) : amount;
  return Math.round(castedAmount * 100);
};

export default convertToCents;
