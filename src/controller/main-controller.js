import MenuComponent from "./../components/menu.js";
import SortComponent from "./../components/sort.js";
import StatsComponent from "./../components/stats.js";
import MovieController from './movie-controller.js';
import MovieSectionComponent from "./../components/movies-section.js";

import {
  generateMenu
} from "./../mock/menu.js";
import {
  generateMovie
} from "./../mock/movie.js";
import {
  render, replace
} from "./../utils/render.js";

const menuItems = generateMenu();
const movieSectionComponent = new MovieSectionComponent();
const movieController = new MovieController(movieSectionComponent);

export default class MainController {
  constructor(container) {
    this._container = container;
  }

  render(movies, profile) {
    // render menu
    const menuComponent = new MenuComponent(menuItems);
    render(this._container, menuComponent);

    // replace stats on click
    const stats = new StatsComponent(movies, profile);
    const showStats = (evt) => {
      evt.preventDefault();
      replace(stats, movieSectionComponent);
    };

    // replace stats on click
    const showMoviesLists = () => {
      replace(movieSectionComponent, stats);
    };

    // set events
    menuComponent.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, showStats);
    menuComponent.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, showMoviesLists);

    // render sort and movies by default
    render(this._container, new SortComponent());
    render(this._container, movieSectionComponent);

    // use movie controller
    movieController.render(movies);
  }
}

