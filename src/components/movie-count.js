import {createElement} from '../utils.js';
import {createMovieCountTemplate} from '../templates/movie-count-template';

export default class Stats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieCountTemplate();
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

