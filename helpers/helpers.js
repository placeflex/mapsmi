import { debounce } from "lodash";

export const debouncedApply = debounce(callback => {
  callback();
}, 1000);

export const removeNumbersFromString = str => {
  let stringWithoutNumbers = str.replace(/\d/g, "");
  stringWithoutNumbers = stringWithoutNumbers.replace(/\s+/g, " ");
  stringWithoutNumbers = stringWithoutNumbers.trim();
  return stringWithoutNumbers;
};

export const isHexColor = string => {
  return (
    string.startsWith("#") &&
    typeof string === "string" &&
    string.length === 7 &&
    !isNaN(Number("0x" + string.replace("#", "")))
  );
};

export const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
