import MenuComponent from "./../components/menu.js";
import {SortType} from "./../templates/sort-template.js";
import SortComponent from "./../components/sort.js";
import StatsComponent from "./../components/stats.js";
import MovieSectionComponent from "./../components/movies-section.js";
import MovieListComponent from "./../components/main-movie-list";
import ShowMoreBtnComponent from "./../components/show-more-btn.js";
import TopRatedComponent from "./../components/top-rated.js";
import MostCommentedComponent from "./../components/most-commented.js";
import NoMoviesComponent from "./../components/no-movies.js";
import MovieController from "./movie-controller.js";
import {render,remove, appendChild, removeChild} from "./../utils/render.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
let showingMovieCardsCount = MAIN_CARD_COUNT;

const renderMovies = (component, moviesSelection, count, elem) => {
  return moviesSelection.slice(0, count).map((movie) => {
    const movieController = new MovieController(component.getListContainer());
    movieController.render(movie, elem);
    
    return movieController;
  });
};

const getSortedMovies = (movies, sortType) => {
  let sortedMovies = [];
  switch (sortType) {
    case SortType.RATING:
      sortedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      break;
    case SortType.DATE:
      sortedMovies = [...movies].sort((a, b) => (a.date < b.date) ? 1 : -1);
      break;
    case SortType.DEFAULT:
      sortedMovies = movies;
      break;
  }

  return sortedMovies;
};

export default class PageController {
  constructor(container, menuItems, movies, profile) {
    this._container = container;

    this._movies = [];
    this._showingMoviesCount = SHOWING_TASKS_COUNT_ON_START;
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
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _showStats(evt) {
    evt.preventDefault();
    removeChild(this._container, this._movieSectionComponent);
    removeChild(this._container, this._sortComponent);
    appendChild(this._container, this._stats);
  }

  _showMoviesLists() {
    const isExist = !!(this._container && this._stats && this._movieSectionComponent && this._sortComponent);
    if (isExist && this._container.contains(this._stats.getElement())) {
      removeChild(this._container, this._stats);
      appendChild(this._container, this._sortComponent);
      appendChild(this._container, this._movieSectionComponent);
    }
  }

  _renderLoadMoreButton(arr) {
    render(this._movieList.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCards = showingMovieCardsCount;
      showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

      arr.slice(prevMovieCards, showingMovieCardsCount)
        .forEach((movie) => renderMovie(this._movieList.getListContainer(), movie, this._movieSectionComponent));

      if (showingMovieCardsCount >= arr.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = SHOWING_TASKS_COUNT_ON_START;
    const sortedMovies = getSortedMovies(this._movies, sortType);
    this._movieList.getListContainer().innerHTML = ``;

    remove(this._showMoreButtonComponent);
    renderMovies(this._movieList, sortedMovies, this._showingMoviesCount, this._movieSectionComponent);
    this._renderLoadMoreButton(sortedMovies);
  }

  render(movies) {
    this._movies = movies;

    render(this._container, this._menuComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);

    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }

    // set events
    this._menuComponent.setStatsClickHandler((evt) => {
      this._showStats(evt);
    });
    this._menuComponent.setMenuClickHandler(() => {
      this._showMoviesLists();
    });

    const renderMainMovieList = (component, arr) => {
      showingMovieCardsCount = MAIN_CARD_COUNT;
      remove(this._showMoreButtonComponent);
      renderMovies(component, arr, showingMovieCardsCount, this._movieSectionComponent);
      this._renderLoadMoreButton(arr);
    };

      // main list movies
      render(this._movieSectionComponent.getElement(), this._movieList);
      renderMainMovieList(this._movieList, movies);

      // top rated list movies
      const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      render(this._movieSectionComponent.getElement(), this._topRatedList);
      renderMovies(this._topRatedList, topRatedMovies, EXTRA_CARD_COUNT, this._movieSectionComponent);

      // // most commented list movies
      const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
      render(this._movieSectionComponent.getElement(), this._mostCommentedList);
      renderMovies(this._mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT, this._movieSectionComponent);
  }
}
