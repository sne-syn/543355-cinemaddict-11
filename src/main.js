import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import StatsComponent from "./components/stats.js";
import MovieController from './controller/movie-controller.js';
import MainController from './controller/main-controller.js';
import MovieSectionComponent from "./components/movies-section.js";
import MovieCountComponent from "./components/movie-count";


import {
  generateMenu
} from "./mock/menu.js";
import {
  generateMovie
} from "./mock/movie.js";
import {
  generateProfile
} from "./mock/profile.js";
import {
  render, replace
} from "./utils/render.js";

const menuItems = generateMenu();
const profile = generateProfile();
export const movies = generateMovie(20);

//const movieSectionComponent = new MovieSectionComponent();

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
// const movieController = new MovieController(movieSectionComponent);

render(siteHeaderElement, new ProfileComponent(profile));
render(footerStatisticsElement, new MovieCountComponent());


// call mainController
const mainController = new MainController(siteMainElement);
mainController.render(movies, profile);


// export default class MainController {
//   constructor(container) {
//     this._container = container;
//   }

//   render(movies, profile) {
//     // render menu
//     const menuComponent = new MenuComponent(menuItems);
//     render(this._container, menuComponent);

//     // replace stats on click
//     const stats = new StatsComponent(movies, profile);
//     const showStats = (evt) => {
//       evt.preventDefault();
//       replace(stats, movieSectionComponent);
//     };

//     // replace stats on click
//     const showMoviesLists = () => {
//       replace(movieSectionComponent, stats);
//     };

//     // set events
//     menuComponent.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, showStats);
//     menuComponent.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, showMoviesLists);

//     // render sort and movies by default
//     render(this._container, new SortComponent());
//     render(this._container, movieSectionComponent);

//     // use movie controller
//     movieController.render(movies);
//   }
// }

// // call mainController
// const mainController = new MainController(siteMainElement);
// mainController.render(movies, profile);
