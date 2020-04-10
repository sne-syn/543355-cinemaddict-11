import {getRandomIntegerNumber, randomDate} from './../util.js';

const authors = [`Movie Buff`, `Movie Donald`, `Movie Goofy`, `John Doe`];
const texts = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];
const emojis = [`angry`, `puke`, `sleeping`, `smile`];


const generateComment = () => {
  return {
    emoji: emojis[getRandomIntegerNumber(0, emojis.length - 1)],
    text: texts[getRandomIntegerNumber(0, texts.length - 1)],
    author: authors[getRandomIntegerNumber(0, authors.length - 1)],
    date: (randomDate(new Date(2012, 0, 1), new Date())).toDateString(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
