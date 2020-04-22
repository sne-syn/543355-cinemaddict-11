import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import StatsComponent from "./components/stats.js";
import MovieController from './controller/movie-controller.js';
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
  render
} from "./utils/render.js";

const menuItems = generateMenu();
const profile = generateProfile();
export const movies = generateMovie(20);

const movieSectionComponent = new MovieSectionComponent();

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const menuComponent = new MenuComponent(menuItems);
const movieController = new MovieController(movieSectionComponent);

render(siteHeaderElement, new ProfileComponent(profile));
render(footerStatisticsElement, new MovieCountComponent());
render(siteMainElement, menuComponent);

// onload and onMenuClick
render(siteMainElement, new SortComponent());
render(siteMainElement, movieSectionComponent);
//Stats
render(siteMainElement, new StatsComponent(movies, profile));

movieController.render(movies);
