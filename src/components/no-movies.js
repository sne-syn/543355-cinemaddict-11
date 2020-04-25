import {createNoMoviesTemplate} from './../templates/no-movies-template.js';
import AbstractComponent from "./abstract-component.js";

export default class NoMovies extends AbstractComponent {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
