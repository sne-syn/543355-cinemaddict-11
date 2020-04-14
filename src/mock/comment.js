import {getRandomIntegerNumber} from './../util.js';

const authors = [`Movie Buff`, `Movie Donald`, `Movie Goofy`, `John Doe`];
const texts = [`Interesting setting and a good cast`, `Booooooooooring`, `There's gritty realism in some scenes.`, `Very very old. Meh`, `Almost two hours? Seriously?`, `I just finished watching the first episode and I have to say I was very impressed.`, `Even if you haven't seen it though, I'd still give this a go.`, `People will always compare a sequel to its predecessor, sometimes rightly so, but this time they would be wrong.`, `I recommend people ignore the hype and hysteria of the media and judge for yourself.`, `This is a similar idea with a twist.`, `Let you know that you should be having fun with this show.`];
const emojis = [`angry`, `puke`, `sleeping`, `smile`];

const addLeadingZeroToDate = (date) => {
  return (date < 10) ? `0${date}` : date;
};

const formatCommentDate = () => {
  let date = new Date();
  date.setDate(getRandomIntegerNumber(1, 31));
  date.setMonth(getRandomIntegerNumber(1, 12));
  date.setFullYear(getRandomIntegerNumber(1940, 2000));
  date.setHours(getRandomIntegerNumber(0, 23));
  date.setMinutes(getRandomIntegerNumber(0, 59));

  let formatedDate = `${date.getFullYear()}/${addLeadingZeroToDate(date.getMonth())}/${addLeadingZeroToDate(date.getDate())} ${addLeadingZeroToDate(date.getHours())}:${addLeadingZeroToDate(date.getMinutes())}`;

  return formatedDate;
};

const generateComment = () => {
  return {
    emoji: emojis[getRandomIntegerNumber(0, emojis.length - 1)],
    text: texts[getRandomIntegerNumber(0, texts.length - 1)],
    author: authors[getRandomIntegerNumber(0, authors.length - 1)],
    date: formatCommentDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
