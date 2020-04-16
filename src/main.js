import ProfileComponent from "./components/user-profile.js";
import MenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import MovieSectionComponent from "./components/movies-section.js";
import MovieListComponent from "./components/movie-list.js";
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

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

const menuItems = generateMenu();
const profiles = generateProfile();
const movies = generateMovie(20);
//const comments = generateComments(movies[0].comments);

// // sort topRated and mostCommented section
let mostCommented = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
let topRated = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
mostCommented.slice(0, 2);
topRated.slice(0, 2);

const renderMovie = (filmListElement, movie) => {
  const movieCardComponent = new MovieCardComponent(movie);
  render(filmListElement, movieCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMovieList = (movieList, movies) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, showingMovieCardsCount).forEach((movie) => {
    renderMovie(filmListElement, movie);
  });
};

const renderTopRated = (movieList, movies) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, EXTRA_CARD_COUNT).forEach((movie) => {
    renderMovie(filmListElement, movie);
  });
};

const renderMostCommented = (movieList, movies) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, EXTRA_CARD_COUNT).forEach((movie) => {
    renderMovie(filmListElement, movie);
  });
};

// generate main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const siteStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profiles).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MovieSectionComponent().getElement(), RenderPosition.BEFOREEND);
render(siteStatisticsElement, new StatsComponent().getElement(), RenderPosition.BEFOREEND);

const movieList = new MovieListComponent();
render(siteMainElement, movieList.getElement(), RenderPosition.BEFOREEND);
renderMovieList(movieList, movies);

const topRatedList = new topRatedComponent();
render(siteMainElement, topRatedList.getElement(), RenderPosition.BEFOREEND);
renderTopRated(topRatedList, topRated);

const mostCommentedList = new MostCommentedComponent();
render(siteMainElement, mostCommentedList.getElement(), RenderPosition.BEFOREEND);
renderMostCommented(mostCommentedList, mostCommented);



// const movieSection = new MovieSectionComponent();
// render(siteMainElement, movieSection.getElement(), RenderPosition.BEFOREEND);
// renderMainSection(movieSection);
// console.log(movieSection);
// create movies section: main - top - commented
// const siteFilmElement = document.querySelector(`.films`);
// render(siteFilmElement, createMainMovieList(), RenderPosition.BEFOREEND);


// // add movie cards in all sections
// const filmListElement = document.querySelector(`.films-list__container`);
// const filmExtraSection = document.querySelectorAll(`.films-list--extra`);
// const filmTopRatedListElement = filmExtraSection[0].querySelector(`.films-list__container`);
// const filmMostCommentedListElement = filmExtraSection[1].querySelector(`.films-list__container`);



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
