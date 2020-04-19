import {createElement} from '../utils.js';
import {createDetailsTemplate} from './../templates/details-template.js';

export default class MovieDetailes {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createDetailsTemplate(this._movie);
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
