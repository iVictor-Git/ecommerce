// given a string
// remove all non-numeric characters

const retrieveOnlyNumbers = (mixedString = "") => {
  const copy = mixedString;
  return copy
    .split("")
    .filter(char => !isNaN(char))
    .join("");
};

module.exports = {
  retrieveOnlyNumbers
};
