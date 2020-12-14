const convertToCents = (amount) => {
  if (typeof amount === "string") {
    return Math.round(
      parseFloat(amount.replace(",", "."), 10).toFixed(2) * 100
    );
  }
  return Math.round(amount.toFixed(2) * 100);
};

export default convertToCents;
