import MovieListComponent from "./../components/main-movie-list";
import ShowMoreBtnComponent from "./../components/show-more-btn.js";
import TopRatedComponent from "./../components/top-rated.js";
import MostCommentedComponent from "./../components/most-commented.js";
import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentComponent from "./../components/comment.js";
import NoMoviesComponent from "./../components/no-movies.js";

import {
  generateComments
} from "./../mock/comment.js";
import {
  render, replace, appendChild, removeChild, remove
} from "./../utils/render.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

//create comment
const renderComment = (commentListElement, comment) => {
  const commentComponent = new CommentComponent(comment);
  render(commentListElement, commentComponent);
};

// create comments list
const renderCommentList = (movie) => {
  const comments = generateComments(movie.comments);
  const commentListElement = document.querySelector(`.film-details__comments-list`);
  comments.forEach((comment) => {
    renderComment(commentListElement, comment);
  });
};

const renderMovie = (filmListElement, movie, container) => {
  const showMovieDetails = () => {
    appendChild(container.getElement(), movieDetailsComponent);
    // render comments
    renderCommentList(movie);
  };

  const closeMovieDetails = () => {
    removeChild(container.getElement(), movieDetailsComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      closeMovieDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const movieCardComponent = new MovieCardComponent(movie);
  movieCardComponent.setOnCardClickHandler(() => {
    showMovieDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const movieDetailsComponent = new MovieDetailsComponent(movie);
  movieDetailsComponent.setCloseButtonClickHandler(() => {
    closeMovieDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, movieCardComponent, container);
};

const renderMovieList = (movieList, movies, count, container) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, count).forEach((movie) => {
    renderMovie(filmListElement, movie, container);
  });
};

const renderMainMovieList = (movieList, movies, container) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  renderMovieList(movieList, movies, showingMovieCardsCount, container);

  const showMoreButtonComponent = new ShowMoreBtnComponent();
  render(container.getElement(), showMoreButtonComponent);

  // add event on showMoreButton
  showMoreButtonComponent.setClickHandler (() => {
    const prevMovieCards = showingMovieCardsCount;
    showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

    movies.slice(prevMovieCards, showingMovieCardsCount)
      .forEach((movie) => renderMovie(filmListElement, movie));

    if (showingMovieCardsCount >= movies.length) {
      remove(showMoreButtonComponent);
    }
  });
};

const renderMoviesSectionsContent = (container, movies) => {
  // main list movies
  const movieList = new MovieListComponent();
  render(container.getElement(), movieList);
  renderMainMovieList(movieList, movies, container);

  // top rated list movies
  const topRatedList = new TopRatedComponent();
  const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  render(container.getElement(), topRatedList);
  renderMovieList(topRatedList, topRatedMovies, EXTRA_CARD_COUNT, container);

  // most commented list movies
  const mostCommentedList = new MostCommentedComponent();
  const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
  render(container.getElement(), mostCommentedList);
  renderMovieList(mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT, container);
};

const noMovies = (container) => {
  render(container.getElement(), new NoMoviesComponent());
};

const isMoviesInDatabase = (container, movies) => {
  (movies.length === 0) ? noMovies(container): renderMoviesSectionsContent(container, movies);
};

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(movies) {
    isMoviesInDatabase(this._container, movies);
  }
}
