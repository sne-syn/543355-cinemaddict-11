import {createMovieCountTemplate} from '../templates/movie-count-template';
import AbstractComponent from "./abstract-component.js";

export default class Stats extends AbstractComponent {
  getTemplate() {
    return createMovieCountTemplate();
  }
}

