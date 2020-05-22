import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common.js';

const authors = [`Movie Buff`, `Movie Donald`, `Movie Goofy`, `John Doe`];
const texts = [`Interesting setting and a good cast`, `Booooooooooring`, `There's gritty realism in some scenes.`, `Very very old. Meh`, `Almost two hours? Seriously?`, `I just finished watching the first episode and I have to say I was very impressed.`, `Even if you haven't seen it though, I'd still give this a go.`, `People will always compare a sequel to its predecessor, sometimes rightly so, but this time they would be wrong.`, `I recommend people ignore the hype and hysteria of the media and judge for yourself.`, `This is a similar idea with a twist.`, `Let you know that you should be having fun with this show.`];
const emojis = [`angry`, `puke`, `sleeping`, `smile`];

const releaseDate = [`2019-06-05T16:12:32.554Z`, `2015-08-12T16:12:32.554Z`, `2018-06-01T16:12:32.554Z`, `2020-04-11T16:12:32.554Z`, `2020-05-05T16:12:32.554Z`, `2020-05-11T16:12:32.554Z`, new Date().toISOString()];
let i = 0;
const generateComment = () => {
  return {
    id: i++,
    emoji: emojis[getRandomIntegerNumber(0, emojis.length)],
    text: texts[getRandomIntegerNumber(0, texts.length)],
    author: authors[getRandomIntegerNumber(0, authors.length)],
    date: getRandomArrayItem(releaseDate),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
