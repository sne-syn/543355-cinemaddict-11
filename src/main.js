'use strict';

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
const MOVIE_INFO_ROWS_COUNT = 7;
export const COMMENTS_COUNT = 4;
const EMOJI_COUNT = 4;
const GENRES_COUNT = 3;

import {createProfileTemplate} from "./components/user-profile.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createContentTemplate} from "./components/main-content.js";
import {createMainMovieList} from "./components/movie-section.js";
import {createTopRatedTemplate} from "./components/top-rated.js";
import {createMostCommentedTemplate} from "./components/most-commented.js";
import {createFilmCardTemplate} from "./components/movie-card.js";
import {createStatisticsTemplate} from "./components/statistics.js";

import {createDetailsTemplate} from "./components/movie-detailes.js";
import {createMovieTableTemplate} from "./components/movie-table-detailes.js";
import {createGenresTemplate} from "./components/genres.js";
import {createCommentTemplate} from "./components/comment.js";
import {createEmojiTemplate} from "./components/emoji-icon.js";

// render function
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate card function
const generateFilmCard = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(), `beforeend`);
  }
};

// generate main content

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const siteStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createContentTemplate(), `beforeend`);
render(siteStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(footerElement, createDetailsTemplate(), `afterend`);


// create movies section: main - top - commented
const siteFilmElement = document.querySelector(`.films`);
render(siteFilmElement, createMainMovieList(), `beforeend`);
render(siteFilmElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmElement, createMostCommentedTemplate(), `beforeend`);

// generate movie cards in all sections
const filmListElement = document.querySelector(`.films-list__container`);
const filmExtraSection = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmExtraSection.length; i++) {
  const filmExtraListElement = filmExtraSection[i].querySelector(`.films-list__container`);
  generateFilmCard(EXTRA_CARD_COUNT, filmExtraListElement);
}

generateFilmCard(MAIN_CARD_COUNT, filmListElement);

// generate table-info about movie
const movieInfoTable = document.querySelector(`.film-details__table`);

for (let i = 0; i < MOVIE_INFO_ROWS_COUNT; i++) {
  render(movieInfoTable, createMovieTableTemplate(), `beforeend`);
}

// generate movie's genres
const filmDetailsRowElements = document.querySelectorAll(`.film-details__row`);

for (let i = 0; i < filmDetailsRowElements.length; i++) {
  if (i === filmDetailsRowElements.length - 1) {
    const filmGenreElement = filmDetailsRowElements[i].querySelector(`.film-details__cell`);
    filmGenreElement.innerHTML = '';
    for (let i = 0; i < GENRES_COUNT; i++) {
      render(filmGenreElement, createGenresTemplate(), `beforeend`);
    }
  }
}

// generate comments and emojis

const commentListElement = document.querySelector(`.film-details__comments-list`);
const emojiListElement = document.querySelector(`.film-details__emoji-list`);

for (let i = 0; i < COMMENTS_COUNT; i++) {
  render(commentListElement, createCommentTemplate(), `beforeend`);
}
for (let i = 0; i < EMOJI_COUNT; i++) {
  render(emojiListElement, createEmojiTemplate(), `beforeend`);
}
