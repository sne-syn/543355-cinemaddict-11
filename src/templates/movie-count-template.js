import {getRandomIntegerNumber} from '../utils.js';

export const createMovieCountTemplate = () => {
  const moviesCount = new Intl.NumberFormat(`ru-RU`).format((getRandomIntegerNumber(10000, 300000)));
  return `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`;
};
