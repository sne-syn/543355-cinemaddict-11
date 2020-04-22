import {createDetailsTemplate} from './../templates/details-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MovieDetailes extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createDetailsTemplate(this._movie);
  }
}
