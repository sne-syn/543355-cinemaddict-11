import ProfileComponent from "./components/profile.js";
import MainController from './controller/main-controller.js';
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

const profile = generateProfile();
export const movies = generateMovie(20);

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profile));
render(footerStatisticsElement, new MovieCountComponent());

// call mainController
const mainController = new MainController(siteMainElement);
mainController.render(movies, profile);
