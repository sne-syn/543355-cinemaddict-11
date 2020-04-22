import {capitalizeEveryFirstChar} from './../utils/common.js';


export const createProfileTemplate = (profile) => {
  const {rating, avatar} = profile;
  const ratingName = capitalizeEveryFirstChar(rating);

  return `<section class="header__profile profile">
    <p class="profile__rating">${ratingName}</p>
    <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
