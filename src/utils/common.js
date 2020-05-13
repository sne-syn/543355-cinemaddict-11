// generate randome integer
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// generate random non-integer
const getRandomNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};

// get 1 random item from arrayOfItems
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

// get several random items
const getSeveralRandomItems = (array, count) => {
  let set = new Set();
  for (let i = 0; i < count; i++) {
    set.add(getRandomArrayItem(array));
  }
  return [...set];
};

// capitalize first char only
const capitalizeChar = (str) => {
  if (typeof str !== `string`) {
    return ``;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// capitalize Every First Char
const capitalizeEveryFirstChar = (str) => {
  return str
    .toLowerCase()
    .split(` `)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(` `);
};

// copy array and convert it to string
const convertArrayToString = (arr) => {
  return [...arr].join(`, `);
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomNumber,
  capitalizeChar,
  capitalizeEveryFirstChar,
  getSeveralRandomItems,
  convertArrayToString,
};
