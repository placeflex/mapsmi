export const removeNumbersFromString = str => {
  let stringWithoutNumbers = str.replace(/\d/g, "");
  stringWithoutNumbers = stringWithoutNumbers.replace(/\s+/g, " ");
  stringWithoutNumbers = stringWithoutNumbers.trim();
  return stringWithoutNumbers;
};
