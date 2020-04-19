import {createElement} from '../utils.js';
import {createStatsTemplate} from './../templates/stats-template.js';

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
