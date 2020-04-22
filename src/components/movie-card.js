import {createMovieCardTemplate} from './../templates/card-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MovieCard extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }
}
