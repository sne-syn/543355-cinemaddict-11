import {createProfileTemplate} from './../templates/profile-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Profile extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }
}
