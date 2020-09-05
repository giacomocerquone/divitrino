/* The response object will be
[
  {
    descr: "",
    price: "",
  },
];
*/

module.exports = function (text) {
  const products = text
    .split("\n")
    .filter((r) => r) // needed for empty rows
    .map((row) => {
      const splittedRow = row.split(" ");
      return {
        price: splittedRow.slice(-1)[0],
        descr: splittedRow.slice(0, splittedRow.length - 1).join(" "),
      };
    });

  return products;
};
