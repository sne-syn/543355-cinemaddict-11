import {createElement} from '../utils.js';
import {createMoviesSectionTemplate} from './../templates/movies-section-template';

export default class MovieSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoviesSectionTemplate();
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

