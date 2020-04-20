import {getRandomIntegerNumber} from '../utils.js';
const watchedMovies = getRandomIntegerNumber(0, 30);

const ratingRange = new Map();
ratingRange.set(`low`, 10);
ratingRange.set(`high`, 20);

const avatarMap = new Map();
avatarMap.set(`no-rating`, {
  rating: ``,
  avatar: `bitmap`
});
avatarMap.set(`novice`, {
  rating: `novice`,
  avatar: `goofy`
});
avatarMap.set(`fan`, {
  rating: `fan`,
  avatar: `donald`
});
avatarMap.set(`movie buff`, {
  rating: `movie buff`,
  avatar: `bitmap`
});

const generateProfile = () => {
  switch (true) {
    case (watchedMovies === 0):
      return avatarMap.get(`no-rating`);
    case (watchedMovies <= ratingRange.get(`low`)):
      return avatarMap.get(`novice`);
    case (watchedMovies > ratingRange.get(`low`) && watchedMovies <= ratingRange.get(`high`)):
      return avatarMap.get(`fan`);
    case (watchedMovies > ratingRange.get(`high`)):
      return avatarMap.get(`movie buff`);
    default:
      return false;
  }
};

export {generateProfile};
