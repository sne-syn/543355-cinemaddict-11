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

const createRuntimeRepresentation = (elem, elemLetter) => {
  let elemStyled = elem < 1 ? `` : `${elem}${elemLetter}`;
  return elemStyled;
};

const convertSecondsToHoursMinutes = (sec) => {
  let timeObj = {};
  let hour = sec / 3600 ^ 0;
  let min = (sec - hour * 3600) / 60 ^ 0;
  timeObj.hours = hour;
  timeObj.minutes = min;

  return timeObj;
};

const getHoursMinutesRuntimeString = (sec) => {
  let element = convertSecondsToHoursMinutes(sec);
  let output = `${createRuntimeRepresentation(element.hours, `h`)} ${createRuntimeRepresentation(element.minutes, `m`)}`;

  return output;
};

// add leading zero to num < 10
const addLeadingZero = (value) => {
  return (value < 10) ? `0${value}` : value;
};

const formateDate = (date) => {
  let formatedDate = `${date.getFullYear()}/${addLeadingZero(date.getMonth())}/${addLeadingZero(date.getDate())} ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
  return formatedDate;
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomNumber, capitalizeChar, capitalizeEveryFirstChar, getSeveralRandomItems, convertArrayToString, convertSecondsToHoursMinutes, getHoursMinutesRuntimeString, addLeadingZero, formateDate};
