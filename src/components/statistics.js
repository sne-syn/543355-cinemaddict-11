import {getRandomIntegerNumber} from './../util.js';

const createStatisticsTemplate = () => {
  const moviesCount = new Intl.NumberFormat(`ru-RU`).format((getRandomIntegerNumber(10000, 300000)));
  return `
  <section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>
  `;
};

export {createStatisticsTemplate};
