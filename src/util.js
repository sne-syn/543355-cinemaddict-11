const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const capitalizeChar = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeEveryFirstChar = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getSeveralRandomItems = (array, count) => {
  let set = new Set();
  for (let i = 0; i < count; i++) {
    set.add(getRandomArrayItem(array));
  }
  return [...set];
};

const convertArrayToString = (data) => {
  return [...data].join(', ');
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomNumber, randomDate, capitalizeChar, capitalizeEveryFirstChar, getSeveralRandomItems, convertArrayToString};
