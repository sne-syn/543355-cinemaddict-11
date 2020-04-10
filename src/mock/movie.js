import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomNumber,
  capitalizeChar,
  getSeveralRandomItems
} from './../util.js';

const Posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const Titles = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`];

const OriginalTitles = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`];

const Genres = [`crime`, `drama`, `comedy`, `melodrama`, `western`, `thriller`, `cartoon`, `mystery`, `musical`];

const Names = [`Anthony Mann`, `Matthew Graham`, `Ashley Pharoah`, `John Strickland`, `Susan Tully`, `Anne Wigton`, `Heinz Herald`, `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Richard Weil`, `Jed Mercurio`];

const Countries = [`USA`, `UK`, `France`, `Spain`, `Canada`];

const Descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`, `Tortor condimentum lacinia quis vel.`, `Pellentesque habitant morbi tristique senectus et netus.`];

const generateMovieCard = () => {
  // let movie = new Map();
  // movie.set('poster', getRandomArrayItem(Posters));

  return {
    poster: getRandomArrayItem(Posters),
    title: getRandomArrayItem(Titles),
    rating: (getRandomNumber(1, 10)).toFixed(1),
    year: getRandomIntegerNumber(1940, 2020),
    runtime: getRandomIntegerNumber(1000, 4000),
    genre: capitalizeChar(getRandomArrayItem(Genres)),
    description: getRandomArrayItem(Descriptions),
    comments: getRandomIntegerNumber(1, 10),
  };
};

const generateMovieCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovieCard);
};

const generateMovieDetailes = () => {

  return {
    poster: getRandomArrayItem(Posters),
    title: getRandomArrayItem(Titles),
    rating: (getRandomNumber(1, 10)).toFixed(1),
    original: getRandomArrayItem(OriginalTitles),
    director: getRandomArrayItem(Names),
    writers: getSeveralRandomItems(Names, getRandomIntegerNumber(1, 8)),
    actors: getSeveralRandomItems(Names, getRandomIntegerNumber(1, 8)),
    year: getRandomIntegerNumber(1940, 2020),
    runtime: getRandomIntegerNumber(1000, 4000),
    country: getSeveralRandomItems(Countries, getRandomIntegerNumber(1, 3)),
    genre: getSeveralRandomItems(Genres, getRandomIntegerNumber(2, 5)),
    description: getRandomArrayItem(Descriptions),
    age: getRandomIntegerNumber(0, 18),
  };
};

export {
  generateMovieCards,
  generateMovieDetailes
};
