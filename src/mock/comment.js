import {getRandomIntegerNumber, randomDate} from './../util.js';

const authors = [`Movie Buff`, `Movie Donald`, `Movie Goofy`, `John Doe`];
const texts = [`Interesting setting and a good cast`, `Booooooooooring`, `There's gritty realism in some scenes.`, `Very very old. Meh`, `Almost two hours? Seriously?`, `I just finished watching the first episode and I have to say I was very impressed.`, `Even if you haven't seen it though, I'd still give this a go.`, `People will always compare a sequel to its predecessor, sometimes rightly so, but this time they would be wrong.`, `I recommend people ignore the hype and hysteria of the media and judge for yourself.`, `This is a similar idea with a twist.`, `Let you know that you should be having fun with this show.`];
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
