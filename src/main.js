import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import StatsComponent from "./components/stats.js";
import MovieSectionComponent from "./components/movies-section.js";
import MovieListComponent from "./components/main-movie-list";
import ShowMoreBtnComponent from "./components/show-more-btn.js";
import TopRatedComponent from "./components/top-rated.js";
import MostCommentedComponent from "./components/most-commented.js";
import MovieCardComponent from "./components/movie-card.js";
import MovieCountComponent from "./components/movie-count";
import MovieDetailsComponent from "./components/movie-details.js";
import CommentComponent from "./components/comment";
import NoMoviesComponent from "./components/no-movies.js";

import {
  generateComments
} from "./mock/comment.js";
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
} from "./utils.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

const menuItems = generateMenu();
const profile = generateProfile();
const movies = generateMovie(20);
const movieSectionComponent = new MovieSectionComponent();
console.log(profile);

// create comment
const renderComment = (commentListElement, comment) => {
  const commentComponent = new CommentComponent(comment);
  render(commentListElement, commentComponent.getElement());
};

// create comments list
const renderCommentList = (movie) => {
  const comments = generateComments(movie.comments);
  const commentListElement = document.querySelector(`.film-details__comments-list`);
  comments.forEach((comment) => {
    renderComment(commentListElement, comment);
  });
};

const renderMovie = (filmListElement, movie) => {
  const showMovieDetails = () => {
    movieSectionComponent.getElement().appendChild(movieDetailsComponent.getElement());
    // render comments
    renderCommentList(movie);
  };

  const closeMovieDetails = () => {
    movieSectionComponent.getElement().removeChild(movieDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      closeMovieDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const movieCardComponent = new MovieCardComponent(movie);
  movieCardComponent.getElement().addEventListener(`click`, () => {
    showMovieDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const movieDetailsComponent = new MovieDetailsComponent(movie);
  const closeButton = movieDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    closeMovieDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(filmListElement, movieCardComponent.getElement());
};

const renderMovieList = (movieList, movies, count) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, count).forEach((movie) => {
    renderMovie(filmListElement, movie);
  });
};

const renderMainMovieList = (movieList, movies) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  renderMovieList(movieList, movies, showingMovieCardsCount);

  const showMoreButtonComponent = new ShowMoreBtnComponent();
  render(movieSectionComponent.getElement(), showMoreButtonComponent.getElement());

  // add event on showMoreButton
  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevMovieCards = showingMovieCardsCount;
    showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

    movies.slice(prevMovieCards, showingMovieCardsCount)
      .forEach((movie) => renderMovie(filmListElement, movie));

    if (showingMovieCardsCount >= movies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profile).getElement());
render(footerStatisticsElement, new MovieCountComponent().getElement());


const renderContent = (siteMainElement) => {
  const menuComponent =  new MenuComponent(menuItems);
  render(siteMainElement, menuComponent.getElement());
};

renderContent(siteMainElement);

// onload and onMenuClick
render(siteMainElement, new SortComponent().getElement());
render(siteMainElement, movieSectionComponent.getElement());

// onStats click
render(siteMainElement, new StatsComponent(movies, profile).getElement());
const renderMoviesSectionsContent = () => {
  // main list movies
  const movieList = new MovieListComponent();
  render(movieSectionComponent.getElement(), movieList.getElement());
  renderMainMovieList(movieList, movies);

  // top rated list movies
  const topRatedList = new TopRatedComponent();
  const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  render(movieSectionComponent.getElement(), topRatedList.getElement());
  renderMovieList(topRatedList, topRatedMovies, EXTRA_CARD_COUNT);

  // most commented list movies
  const mostCommentedList = new MostCommentedComponent();
  const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
  render(movieSectionComponent.getElement(), mostCommentedList.getElement());
  renderMovieList(mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT);
};

const noMovies = () => {
  render(movieSectionComponent.getElement(), new NoMoviesComponent().getElement());
};

const isMoviesInDatabase = () => {
  (movies.length === 0) ? noMovies(): renderMoviesSectionsContent();
};

isMoviesInDatabase();

