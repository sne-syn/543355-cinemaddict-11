import {createMoviesSectionTemplate} from './../templates/movies-section-template';
import AbstractComponent from "./abstract-component.js";

export default class MovieSection extends AbstractComponent {
  getTemplate() {
    return createMoviesSectionTemplate();
  }
}

