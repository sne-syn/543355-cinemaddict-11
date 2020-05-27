import {
  createMovieListTemplate
} from '../templates/movie-list-template';
import AbstractComponent from "./abstract-component.js";

export default class MovieList extends AbstractComponent {
  constructor() {
    super();
    this._container = this.getElement().querySelector(`.films-list__container`);

    this.getContainer = function () {
      return this._container;
    };
  }

  getTemplate() {
    return createMovieListTemplate();
  }
}
