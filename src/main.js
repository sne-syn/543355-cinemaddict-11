import {
  createProfileTemplate
} from "./components/user-profile.js";
import {
  generateMenu
} from "./mock/menu.js";
import {
  createMenuTemplate
} from "./components/site-menu.js";
import {
  createSortTemplate
} from "./components/sorting.js";
import {
  createContentTemplate
} from "./components/main-content.js";
import {
  createMainMovieList
} from "./components/movie-section.js";
import {
  createTopRatedTemplate
} from "./components/top-rated.js";
import {
  createMostCommentedTemplate
} from "./components/most-commented.js";
import {
  createFilmCardTemplate
} from "./components/movie-card.js";
import {
  createStatisticsTemplate
} from "./components/statistics.js";
import {
  generateMovieCards,
  generateMovieDetailes
} from "./mock/movie.js";
import {
  generateProfile
} from "./mock/profile.js";
import {
  generateComments
} from "./mock/comment.js";
import {
  createDetailsTemplate
} from "./components/movie-detailes.js";
import {
  createCommentTemplate
} from "./components/comment-component.js";
import {
  getRandomIntegerNumber
} from './util.js';
import {
  generateMovie
} from "./mock/movie.js";

const MAIN_CARD_COUNT = 5;
const COMMENTS_COUNT = getRandomIntegerNumber(1, 5);

// render function
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate card function
const generateFilmCardTemplate = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(movies[i]), `beforeend`);
  }
};

const menuItems = generateMenu();
const profiles = generateProfile();
const movies = generateMovie(20);
const comments = generateComments(COMMENTS_COUNT);

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
//render(footerElement, createDetailsTemplate(movies[0]), `afterend`);

// create movies section: main - top - commented
const siteFilmElement = document.querySelector(`.films`);
render(siteFilmElement, createMainMovieList(), `beforeend`);
render(siteFilmElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmElement, createMostCommentedTemplate(), `beforeend`);

// add movie cards in all sections
const filmListElement = document.querySelector(`.films-list__container`);
const filmExtraSection = document.querySelectorAll(`.films-list--extra`);


const filmTopRatedListElement = filmExtraSection[0].querySelector(`.films-list__container`);
const filmMostCommentedListElement = filmExtraSection[1].querySelector(`.films-list__container`);

const sortExtraCards = (arr) => {
  return [...arr].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
};

console.log(sortExtraCards(movies));

let mostCommented = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
let bestRated = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);

const generateExtraCards = (arr, section) => {
  for (let i = 0; i < 2; i++) {
    render(section, createFilmCardTemplate(arr[i]), `beforeend`);
  }
};

generateExtraCards(bestRated, filmTopRatedListElement);
generateExtraCards(mostCommented, filmMostCommentedListElement);
generateFilmCardTemplate(MAIN_CARD_COUNT, filmListElement);

// generate comments
// const commentListElement = document.querySelector(`.film-details__comments-list`);

// for (let i = 0; i < comments.length; i++) {
//   render(commentListElement, createCommentTemplate(comments[i]), `beforeend`);
// }

export {
  COMMENTS_COUNT
};
