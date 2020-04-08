'use strict';
import {createProfileTemplate} from "./components/user-profile.js";
import {generateMenu} from "./mock/menu.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createContentTemplate} from "./components/main-content.js";
import {createMainMovieList} from "./components/movie-section.js";
import {createTopRatedTemplate} from "./components/top-rated.js";
import {createMostCommentedTemplate} from "./components/most-commented.js";
import {createFilmCardTemplate} from "./components/movie-card.js";
import {createStatisticsTemplate} from "./components/statistics.js";
//import {generateMovieCards} from "./mock/movie.js";
import {generateProfile} from "./mock/profile.js";
import {createDetailsTemplate} from "./components/movie-detailes.js";
import {createCommentTemplate} from "./components/comment.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
export const COMMENTS_COUNT = 4;

// render function
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate card function
const generateFilmCard = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate('Ashes to Ashes', 8.1, 2008, 1, 'Crime', 'ashes.jpg', 'description', 5), `beforeend`);
  }
};

const menuItems = generateMenu();
const profiles = generateProfile();


// generate main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const siteStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createProfileTemplate(profiles), `beforeend`);
render(siteMainElement, createMenuTemplate(menuItems), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createContentTemplate(), `beforeend`);
render(siteStatisticsElement, createStatisticsTemplate(), `beforeend`);
//render(footerElement, createDetailsTemplate(), `afterend`);

// create movies section: main - top - commented
const siteFilmElement = document.querySelector(`.films`);
render(siteFilmElement, createMainMovieList(), `beforeend`);
render(siteFilmElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmElement, createMostCommentedTemplate(), `beforeend`);

// add movie cards in all sections
const filmListElement = document.querySelector(`.films-list__container`);
const filmExtraSection = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmExtraSection.length; i++) {
  const filmExtraListElement = filmExtraSection[i].querySelector(`.films-list__container`);
  generateFilmCard(EXTRA_CARD_COUNT, filmExtraListElement);
}

generateFilmCard(MAIN_CARD_COUNT, filmListElement);

// generate comments
// const commentListElement = document.querySelector(`.film-details__comments-list`);

// for (let i = 0; i < COMMENTS_COUNT; i++) {
//   render(commentListElement, createCommentTemplate(), `beforeend`);
// }
