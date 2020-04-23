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

import {
  generateComments
} from "./../mock/comment.js";
import {
  generateMenu
} from "./../mock/menu.js";
import {
  generateMovie
} from "./../mock/movie.js";
import {
  render, replace, remove, appendChild, removeChild
} from "./../utils/render.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

const menuItems = generateMenu();
const movieSectionComponent = new MovieSectionComponent();

export default class MainController {
  constructor(container) {
    this._container = container;
  }

  render(movies, profile) {
    // render menu
    const menuComponent = new MenuComponent(menuItems);
    render(this._container, menuComponent);

    // replace stats on click
    const stats = new StatsComponent(movies, profile);
    const showStats = (evt) => {
      evt.preventDefault();
      replace(stats, movieSectionComponent);
    };

    // replace stats on click
    const showMoviesLists = () => {
      replace(movieSectionComponent, stats);
    };

    // set events
    menuComponent.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, showStats);
    menuComponent.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, showMoviesLists);

    // render sort and movies by default
    render(this._container, new SortComponent());
    render(this._container, movieSectionComponent);

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

    const renderMovie = (filmListElement, movie) => {
      const showMovieDetails = () => {
        appendChild(movieSectionComponent.getElement(), movieDetailsComponent);
        // render comments
        renderCommentList(movie);
      };

      const closeMovieDetails = () => {
        removeChild(movieSectionComponent.getElement(), movieDetailsComponent);
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

      render(filmListElement, movieCardComponent);
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
      render(movieSectionComponent.getElement(), showMoreButtonComponent);

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

    const renderMoviesSectionsContent = (movies) => {
      // main list movies
      const movieList = new MovieListComponent();
      render(movieSectionComponent.getElement(), movieList);
      renderMainMovieList(movieList, movies);

      // top rated list movies
      const topRatedList = new TopRatedComponent();
      const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      render(movieSectionComponent.getElement(), topRatedList);
      renderMovieList(topRatedList, topRatedMovies, EXTRA_CARD_COUNT);

      // most commented list movies
      const mostCommentedList = new MostCommentedComponent();
      const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
      render(movieSectionComponent.getElement(), mostCommentedList);
      renderMovieList(mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT);
    };

    const noMovies = () => {
      render(movieSectionComponent.getElement(), new NoMoviesComponent());
    };

    const isMoviesInDatabase = (movies) => {
      (movies.length === 0) ? noMovies(): renderMoviesSectionsContent(movies);
    };

    isMoviesInDatabase(movies);
  }
}

