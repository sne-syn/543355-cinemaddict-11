import {createElement} from '../utils.js';
import {createStatsTemplate} from './../templates/stats-template.js';

export default class Stats {
  constructor(movies, profile) {
    this._movies = movies;
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createStatsTemplate(this._movies, this._profile);
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
