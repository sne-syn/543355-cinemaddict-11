import {createStatsTemplate} from './../templates/stats-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Stats extends AbstractComponent {
  constructor(movies, profile) {
    super();

    this._movies = movies;
    this._profile = profile;
  }

  getTemplate() {
    return createStatsTemplate(this._movies, this._profile);
  }


}
