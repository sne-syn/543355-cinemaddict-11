import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomNumber,
  getSeveralRandomItems,
  convertArrayToString
} from '../utils/common.js';

const Posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`, `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpeg`, `6.jpg`, `7.jpg`, `8.png`, `10.jpg`, `11.jpg`, `12.jpg`, `13.jpg`, `14.jpg`];

const Titles = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`];

const OriginalTitles = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`];

const Genres = [`crime`, `drama`, `comedy`, `melodrama`, `western`, `thriller`, `cartoon`, `mystery`, `musical`];

const Names = [`Anthony Mann`, `Matthew Graham`, `Ashley Pharoah`, `John Strickland`, `Susan Tully`, `Anne Wigton`, `Heinz Herald`, `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Richard Weil`, `Jed Mercurio`];

const Countries = [`USA`, `UK`, `France`, `Spain`, `Canada`];

const Descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


const getRandomStringLength = (str) => {
  let description = str.split(`. `).slice(getRandomIntegerNumber(0, 5), getRandomIntegerNumber(5, 5)).join(`. `);
  return description;
};

const getRandomReleaseDate = () => {
  const releaseDate = new Date();
  releaseDate.setDate(getRandomIntegerNumber(1, 31));
  releaseDate.setMonth(getRandomIntegerNumber(0, 11));
  releaseDate.setFullYear(getRandomIntegerNumber(1940, 2000));

  return releaseDate;
};

const generateMoviesInfo = () => {
  return {
    poster: getRandomArrayItem(Posters),
    title: getRandomArrayItem(Titles),
    rating: (getRandomNumber(0, 10)).toFixed(1),
    original: getRandomArrayItem(OriginalTitles),
    director: getRandomArrayItem(Names),
    writers: convertArrayToString(getSeveralRandomItems(Names, getRandomIntegerNumber(1, 8))),
    actors: convertArrayToString(getSeveralRandomItems(Names, getRandomIntegerNumber(1, 8))),
    date: getRandomReleaseDate(),
    runtime: getRandomIntegerNumber(500, 10000),
    country: convertArrayToString(getSeveralRandomItems(Countries, getRandomIntegerNumber(1, 3))),
    genre: getSeveralRandomItems(Genres, getRandomIntegerNumber(2, 3)),
    description: getRandomStringLength(Descriptions),
    age: getRandomIntegerNumber(10, 18),
    comments: getRandomIntegerNumber(1, 6),
    isInWatchlist: Math.random() > 0.5,
    isAlreadyWatched: Math.random() > 0.5,
    isInFavorites: Math.random() > 0.5,
  };
};

const generateMovie = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMoviesInfo);
};

export {
  generateMoviesInfo,
  generateMovie
};
