import ProfileComponent from "./components/profile.js";
import PageController from './controller/page-controller.js';
import MovieCountComponent from "./components/movie-count";

import {
  generateMovie
} from "./mock/movie.js";
import {
  generateProfile
} from "./mock/profile.js";
import {
  render
} from "./utils/render.js";
import {
  generateMenu
} from "./mock/menu.js";

const menuItems = generateMenu();
const profile = generateProfile();
export const movies = generateMovie(20);

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profile));
render(footerStatisticsElement, new MovieCountComponent());

// call pageController
const pageController = new PageController(siteMainElement, menuItems, profile);
pageController.render(movies, profile);
