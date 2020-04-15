import ProfileComponent from "./components/user-profile.js";
import MenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import MainSectionComponent from "./components/main-content.js";
import MovieListComponent from "./components/movie-section.js";
import ShowMoreBtnComponent from "./components/show-more-btn.js";
import topRatedComponent from "./components/top-rated.js";
import MostCommentedComponent from "./components/most-commented.js";
import MovieCardComponent from "./components/movie-card.js";
import StatsComponent from "./components/statistics.js";
import MovieDetailesComponent from "./components/movie-detailes.js";
import CommentComponent from "./components/comment-component.js";

//import {generateComments} from "./mock/comment.js";
import {generateMenu} from "./mock/menu.js";
import {generateMovie} from "./mock/movie.js";
import {generateProfile} from "./mock/profile.js";
import {RenderPosition, render} from "./utils.js";

// const MAIN_CARD_COUNT = 5;
// const EXTRA_CARD_COUNT = 2;
// let showingMovieCardsCount = MAIN_CARD_COUNT;

// const renderMovie = () => {};

// const renderMainSection = () => {};

// // generate card function
// const generateFilmCardElements = (count, container) => {
//   for (let i = 0; i < count; i++) {
//     render(container, new MovieCardComponent(movies[i]).getElement(), RenderPosition.BEFOREEND);
//   }
// };

const menuItems = generateMenu();
const profiles = generateProfile();
const movies = generateMovie(20);
//const comments = generateComments(movies[0].comments);

// generate main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const siteStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profiles).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainSectionComponent().getElement(), RenderPosition.BEFOREEND);
render(siteStatisticsElement, new StatsComponent().getElement(), RenderPosition.BEFOREEND);

console.log(new ProfileComponent(profiles).getElement());
// create movies section: main - top - commented
// const siteFilmElement = document.querySelector(`.films`);
// render(siteFilmElement, createMainMovieList(), RenderPosition.BEFOREEND);
// render(siteFilmElement, createTopRatedTemplate(), RenderPosition.BEFOREEND);
// render(siteFilmElement, createMostCommentedTemplate(), RenderPosition.BEFOREEND);

// // add movie cards in all sections
// const filmListElement = document.querySelector(`.films-list__container`);
// const filmExtraSection = document.querySelectorAll(`.films-list--extra`);
// const filmTopRatedListElement = filmExtraSection[0].querySelector(`.films-list__container`);
// const filmMostCommentedListElement = filmExtraSection[1].querySelector(`.films-list__container`);

// // sort topRated and mostCommented section
// let mostCommented = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
// let bestRated = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
// mostCommented.slice(0, 2);
// bestRated.slice(0, 2);

// const generateExtraCards = (arr, section) => {
//   for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
//     render(section, createFilmCardTemplate(arr[i]), RenderPosition.BEFOREEND);
//   }
// };

// generateExtraCards(bestRated, filmTopRatedListElement);
// generateExtraCards(mostCommented, filmMostCommentedListElement);
// generateFilmCardElements(MAIN_CARD_COUNT, filmListElement);

// // add load-more functionality
// const loadMoreButton = document.querySelector(`.films-list__show-more`);

// loadMoreButton.addEventListener(`click`, () => {
//   let prevMovieCards = showingMovieCardsCount;
//   showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

//   movies.slice(prevMovieCards, showingMovieCardsCount)
//     .forEach((movie) => render(filmListElement, createFilmCardTemplate(movie), RenderPosition.BEFOREEND));

//   if (showingMovieCardsCount >= movies.length) {
//     loadMoreButton.remove();
//   }
// });

// const firstCard = document.querySelector(`.film-card`);
// var removeDetails = () => {
//   var filmDetailesElem = document.querySelector(`.film-details`);
//   if (filmDetailesElem) {
//     filmDetailesElem.remove();
//   }
// };

// firstCard.addEventListener('click', () => {
//   render(footerElement, createDetailsTemplate(movies[0]), RenderPosition.AFTEREND);

//   //generate comments
//   const commentListElement = document.querySelector(`.film-details__comments-list`);

//   const commentsCount = movies[0].comments;
//   for (let i = 0; i < commentsCount; i++) {
//     render(commentListElement, createCommentTemplate(comments[i]), RenderPosition.BEFOREEND);
//   }

//   let button = document.querySelector(`.film-details__close-btn`);
//   button.addEventListener(`click`, removeDetails);
// });
