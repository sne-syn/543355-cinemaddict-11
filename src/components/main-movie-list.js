import {createElement} from '../utils.js';
import {createMovieListTemplate} from './../templates/main-movie-list-template.js';

export default class MovieList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieListTemplate();
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
