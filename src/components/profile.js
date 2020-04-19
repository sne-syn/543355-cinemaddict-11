import {createElement} from '../utils.js';
import {createProfileTemplate} from './../templates/profile-template.js';

export default class Profile {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
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
