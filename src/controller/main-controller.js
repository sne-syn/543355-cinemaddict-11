import MenuComponent from "./../components/menu.js";
import SortComponent from "./../components/sort.js";
import StatsComponent from "./../components/stats.js";
import MovieSectionComponent from "./../components/movies-section.js";
import MovieListComponent from "./../components/main-movie-list";
import ShowMoreBtnComponent from "./../components/show-more-btn.js";
import TopRatedComponent from "./../components/top-rated.js";
import MostCommentedComponent from "./../components/most-commented.js";
import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentComponent from "./../components/comment.js";
import NoMoviesComponent from "./../components/no-movies.js";

import {generateComments} from "./../mock/comment.js";
import {render, remove, appendChild, removeChild} from "./../utils/render.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

export default class MainController {
  constructor(container, menuItems, movies, profile) {
    this._container = container;
    this._menuComponent = new MenuComponent(menuItems);
    this._sortComponent = new SortComponent();
    this._movieSectionComponent = new MovieSectionComponent();
    this._showMoreButtonComponent = new ShowMoreBtnComponent();
    this._movieList = new MovieListComponent();
    this._topRatedList = new TopRatedComponent();
    this._mostCommentedList = new MostCommentedComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._stats = new StatsComponent(movies, profile);
    this._showStats = this._showStats.bind(this);
    this._showMoviesLists = this._showMoviesLists.bind(this);
  }

  _showStats(evt) {
    evt.preventDefault();
    removeChild(this._container, this._movieSectionComponent);
    removeChild(this._container, this._sortComponent);
    appendChild(this._container, this._stats);
  }

  // replace stats on click
  _showMoviesLists() {
    if (this._container && this._stats) {
      removeChild(this._container, this._stats);
      appendChild(this._container, this._sortComponent);
      appendChild(this._container, this._movieSectionComponent);
    }
  }

  render(movies) {
    render(this._container, this._menuComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);


    // set events
    this._menuComponent.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._showStats);
    this._menuComponent.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._showMoviesLists);

    // create comments list
    const renderCommentList = (movie) => {
      const comments = generateComments(movie.comments);
      const commentListElement = document.querySelector(`.film-details__comments-list`);
      // remove prev comments
      while (commentListElement.firstChild) {
        commentListElement.removeChild(commentListElement.firstChild);
      }
      // render new comments
      comments.forEach((comment) => {
        const commentComponent = new CommentComponent(comment);
        render(commentListElement, commentComponent);
      });
    };

    const renderMovie = (filmListElement, movie) => {
      const showMovieDetails = () => {
        appendChild(this._movieSectionComponent.getElement(), movieDetailsComponent);
        // render comments
        renderCommentList(movie);
      };

      const closeMovieDetails = () => {
        removeChild(this._movieSectionComponent.getElement(), movieDetailsComponent);
      };

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          closeMovieDetails();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      //
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

      render(filmListElement, movieCardComponent);
    };

    const renderMovieList = (movieList, moviesSelection, count) => {
      const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
      moviesSelection.slice(0, count).forEach((movie) => {
        renderMovie(filmListElement, movie);
      });
    };

    const renderMainMovieList = (movieList, moviesSelection) => {
      const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
      renderMovieList(movieList, moviesSelection, showingMovieCardsCount);
      render(this._movieSectionComponent.getElement(), this._showMoreButtonComponent);

      // add event on showMoreButton
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevMovieCards = showingMovieCardsCount;
        showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

        moviesSelection.slice(prevMovieCards, showingMovieCardsCount)
          .forEach((movie) => renderMovie(filmListElement, movie));

        if (showingMovieCardsCount >= moviesSelection.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const renderMoviesSectionsContent = () => {
      // main list movies
      render(this._movieSectionComponent.getElement(), this._movieList);
      renderMainMovieList(this._movieList, movies);

      // top rated list movies
      const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      render(this._movieSectionComponent.getElement(), this._topRatedList);
      renderMovieList(this._topRatedList, topRatedMovies, EXTRA_CARD_COUNT);

      // most commented list movies

      const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
      render(this._movieSectionComponent.getElement(), this._mostCommentedList);
      renderMovieList(this._mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT);
    };

    const noMovies = () => {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
    };

    const isMoviesInDatabase = () => {
      return (movies.length === 0) ? noMovies() : renderMoviesSectionsContent();
    };

    isMoviesInDatabase(movies);
  }
}
