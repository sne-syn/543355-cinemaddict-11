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

const renderMovies = (moviesSelection, commonContainer, properMovieListContainer, onDataChange, onViewChange, profile) => {
  return moviesSelection.map((movie) => {
    const movieController = new MovieController(onDataChange, onViewChange, commonContainer, profile);
    movieController.render(movie, properMovieListContainer);
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
  constructor(container, menuItems, profile, moviesModel) {
    this._container = container;
    this._profile = profile;
    this._moviesModel = moviesModel;
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

    this._stats = new StatsComponent(moviesModel.getMovies(), this._profile);
    this._showStats = this._showStats.bind(this);
    this._showMoviesLists = this._showMoviesLists.bind(this);

    this._menuComponent.setMenuClickHandler(this._showMoviesLists);
    this._menuComponent.setStatsClickHandler(this._showStats);

    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._mainMovieContainer = this._movieList.getListContainer();
    this._topRatedContainer = this._topRatedList.getListContainer();
    this._mostCommentedContainer = this._mostCommentedList.getListContainer();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._menuComponent.subscribeOnEvents();
  }

  render() {
    const movies = this._moviesModel.getMovies();

    render(this._container, this._menuComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);
    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }

    render(this._movieSectionComponent.getElement(), this._movieList);
    const newMovies = renderMovies(movies.slice(0, this._showingMoviesCount), this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._onViewChange, this._profile);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._renderLoadMoreButton();

    // top rated list movies
    const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    if (topRatedMovies[0].rating > 0 || topRatedMovies[1].rating > 0) {
      render(this._movieSectionComponent.getElement(), this._topRatedList);
      const ratedMovies = renderMovies(topRatedMovies.slice(0, this._showingExtraCards), this._movieSectionComponent, this._topRatedContainer, this._onDataChange, this._onViewChange, this._profile);
      this._showedMoviesControllers = this._showedMoviesControllers.concat(ratedMovies);
    }

    // most commented list movies
    const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
    if (mostCommentedMovies[0].comments > 0 || mostCommentedMovies[1].comments > 0) {
      render(this._movieSectionComponent.getElement(), this._mostCommentedList);
      const commentedMovies = renderMovies(mostCommentedMovies.slice(0, this._showingExtraCards), this._movieSectionComponent, this._mostCommentedContainer, this._onDataChange, this._onViewChange, this._profile);
      this._showedMoviesControllers = this._showedMoviesControllers.concat(commentedMovies);
    }
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, oldData, newData, commonContainer, properContainer) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData, commonContainer, properContainer);
    }
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
    const movies = this._moviesModel.getMovies();
    if (this._showingMoviesCount >= movies.length) {
      return;
    }

    render(this._movieList.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieCards = this._showingMoviesCount;
      this._showingMoviesCount += SHOWING_MOVIES_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(movies, this._sortComponent.getSortType(), prevMovieCards, this._showingMoviesCount);

      const newMovies = renderMovies(sortedMovies, this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._onViewChange, this._profile);
      this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);

      if (this._showingMoviesCount >= movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const movies = this._moviesModel.getMovies();
    remove(this._showMoreButtonComponent);
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._mainMovieContainer.innerHTML = ``;
    const sortedMovies = getSortedMovies(movies, sortType, 0, this._showingMoviesCount);

    const newMovies = renderMovies(sortedMovies, this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._onViewChange, this._profile);
    this._showedMoviesControllers = newMovies;

    this._renderLoadMoreButton();
  }
}
