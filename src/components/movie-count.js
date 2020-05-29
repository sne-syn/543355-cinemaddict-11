import {createMovieCountTemplate} from '../templates/movie-count-template';
import AbstractComponent from "./abstract-component.js";

export default class MovieCount extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createMovieCountTemplate(this._movies);
  }
}

