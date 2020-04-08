const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const createProfileTemplate = (profiles) => {
  const {rating, avatar} = profiles[getRandomIntegerNumber(0, 3)];

  return `
  <section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `;
};
