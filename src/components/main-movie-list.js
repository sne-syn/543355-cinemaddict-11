import {
  createMovieListTemplate
} from './../templates/main-movie-list-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MovieList extends AbstractComponent {
  constructor() {
    super();
    this._container = this.getElement().querySelector(`.films-list__container`);

    this.getListContainer = function () {
      return this._container;
    };
  }

  getTemplate() {
    return createMovieListTemplate();
  }
}
