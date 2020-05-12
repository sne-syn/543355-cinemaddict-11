import {createMovieListTemplate} from './../templates/main-movie-list-template.js';
import ListComponent from "./list-component.js";

export default class MovieList extends ListComponent {
  getTemplate() {
    return createMovieListTemplate();
  }
}
