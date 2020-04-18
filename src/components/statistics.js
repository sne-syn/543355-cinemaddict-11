import {getRandomIntegerNumber, createElement} from '../utils.js';

const createStatsTemplate = () => {
  const moviesCount = new Intl.NumberFormat(`ru-RU`).format((getRandomIntegerNumber(10000, 300000)));
  return `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`;
};

export default class Stats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

