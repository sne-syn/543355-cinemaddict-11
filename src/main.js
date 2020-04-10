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
import {generateMovieCards, generateMovieDetailes} from "./mock/movie.js";
import {generateProfile} from "./mock/profile.js";
import {generateComments} from "./mock/comment.js";
import {createDetailsTemplate} from "./components/movie-detailes.js";
import {createCommentTemplate} from "./components/comment-component.js";
import {getRandomIntegerNumber} from './util.js';

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
export const COMMENTS_COUNT = getRandomIntegerNumber(1, 10);

// render function
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate card function
const generateFilmCardTemplate = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(movieCards[i]), `beforeend`);
  }
};

const menuItems = generateMenu();
const profiles = generateProfile();
const movieCards = generateMovieCards(MAIN_CARD_COUNT);
const movieDetailes = generateMovieDetailes();
const comments = generateComments(COMMENTS_COUNT);
console.log(generateMovieDetailes());
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
render(footerElement, createDetailsTemplate(movieDetailes), `afterend`);

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
  generateFilmCardTemplate(EXTRA_CARD_COUNT, filmExtraListElement);
}

generateFilmCardTemplate(MAIN_CARD_COUNT, filmListElement);

// // generate comments
const commentListElement = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < comments.length; i++) {
  render(commentListElement, createCommentTemplate(comments[i]), `beforeend`);
}
