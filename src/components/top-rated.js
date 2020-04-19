import {createElement} from '../utils.js';
import {createTopRatedTemplate} from './../templates/top-rated-template.js';

export default class TopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedTemplate();
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

