import {createElement} from "../utils";
import {createNoMoviesTemplate} from './../templates/no-movies-template.js';

export default class NoMovies {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoMoviesTemplate();
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
