import MenuComponent from "./../components/menu.js";
import {
  SortType
} from "./../templates/sort-template.js";
import SortComponent from "./../components/sort.js";
import StatsComponent from "./../components/stats.js";
import MovieSectionComponent from "./../components/movies-section.js";
import MovieListComponent from "./../components/main-movie-list";
import ShowMoreBtnComponent from "./../components/show-more-btn.js";
import TopRatedComponent from "./../components/top-rated.js";
import MostCommentedComponent from "./../components/most-commented.js";
import NoMoviesComponent from "./../components/no-movies.js";
import MovieController from "./movie-controller.js";
import {
  render,
  remove,
  appendChild,
  removeChild
} from "./../utils/render.js";

const EXTRA_CARD_COUNT = 2;
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderMovies = (properMovieListContainer, moviesSelection, commonContainer) => {
  return moviesSelection.map((movie) => {
    const movieController = new MovieController(properMovieListContainer);

    movieController.render(movie, commonContainer);

    return movieController;
  });
};

const getSortedMovies = (movies, sortType, from, to) => {
  let sortedMovies = [];
  switch (sortType) {
    case SortType.RATING:
      sortedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      break;
    case SortType.DATE:
      sortedMovies = [...movies].sort((a, b) => (a.date < b.date) ? 1 : -1);
      break;
    case SortType.DEFAULT:
      sortedMovies = [...movies];
      break;
  }

  return sortedMovies.slice(from, to);
};

export default class PageController {
  constructor(container, menuItems, profile) {
    this._container = container;

    this._movies = [];
    this._showedMoviesControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._showingExtraCards = EXTRA_CARD_COUNT;
    this._menuComponent = new MenuComponent(menuItems);
    this._sortComponent = new SortComponent();
    this._movieSectionComponent = new MovieSectionComponent();
    this._showMoreButtonComponent = new ShowMoreBtnComponent();
    this._movieList = new MovieListComponent();
    this._topRatedList = new TopRatedComponent();
    this._mostCommentedList = new MostCommentedComponent();
    this._noMoviesComponent = new NoMoviesComponent();

    // como pasar movies
    this._stats = new StatsComponent(this._movies, profile);
    this._showStats = this._showStats.bind(this);
    this._showMoviesLists = this._showMoviesLists.bind(this);

    this._menuComponent.setMenuClickHandler(this._showMoviesLists);
    this._menuComponent.setStatsClickHandler(this._showStats);

    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    //===========
    this._mainMovieContainer = this._movieList.getListContainer();
    this._topRatedContainer = this._topRatedList.getListContainer();
    this._mostCommentedContainer = this._mostCommentedList.getListContainer();
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

    render(this._movieSectionComponent.getElement(), this._movieList);
    remove(this._showMoreButtonComponent);
    const newMovies = renderMovies(this._mainMovieContainer, this._movies.slice(0, this._showingMoviesCount), this._movieSectionComponent);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._renderLoadMoreButton();

    // top rated list movies
    const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    render(this._movieSectionComponent.getElement(), this._topRatedList);
    renderMovies(this._topRatedContainer, topRatedMovies.slice(0, this._showingExtraCards), this._movieSectionComponent);

    // // most commented list movies
    const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
    render(this._movieSectionComponent.getElement(), this._mostCommentedList);
    renderMovies(this._mostCommentedContainer, mostCommentedMovies.slice(0, this._showingExtraCards), this._movieSectionComponent);
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

  _renderLoadMoreButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    render(this._movieList.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCards = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._movies, this._sortComponent.getSortType(), prevMovieCards, this._showingMoviesCount);

      const newMovies = renderMovies(this._mainMovieContainer, sortedMovies, this._movieSectionComponent);
      this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);

      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType, 0, this._showingMoviesCount);
    this._mainMovieContainer.innerHTML = ``;

    remove(this._showMoreButtonComponent);
    const newMovies = renderMovies(this._mainMovieContainer, sortedMovies, this._movieSectionComponent);
    this._showedMoviesControllers = newMovies;

    this._renderLoadMoreButton();
  }

}
