import {createMovieListTemplate} from './../templates/main-movie-list-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MovieList extends AbstractComponent {
  getTemplate() {
    return createMovieListTemplate();
  }
}
