import MenuController from "./../controller/menu-controller";
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
  removeChild,
  RenderPosition
} from "./../utils/render.js";

const EXTRA_CARD_COUNT = 2;
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderMovies = (moviesSelection, commonContainer, properMovieListContainer, onDataChange, profile, commentsModel) => {
  return moviesSelection.map((movie) => {
    const movieController = new MovieController(onDataChange, commonContainer, profile, commentsModel);
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
  constructor(container, profile, moviesModel, commentsModel) {
    this._container = container;
    this._profile = profile;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._showedMoviesControllers = [];
    this._showedMoviesControllersExtra = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._showingExtraCards = EXTRA_CARD_COUNT;
    this._menuController = new MenuController(container, moviesModel);
    this._sortComponent = new SortComponent();
    this._movieSectionComponent = new MovieSectionComponent();
    this._showMoreButtonComponent = new ShowMoreBtnComponent();
    this._movieList = new MovieListComponent();
    this._topRatedList = new TopRatedComponent();
    this._mostCommentedList = new MostCommentedComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._stats = new StatsComponent(moviesModel.getMovies(), this._profile);

    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._updateMovies = this._updateMovies.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._mainMovieContainer = this._movieList.getListContainer();
    this._topRatedContainer = this._topRatedList.getListContainer();
    this._mostCommentedContainer = this._mostCommentedList.getListContainer();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setMenuChangeHandler(this._onMenuChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();
    this._topRatedMovies = [...this._moviesModel.getMovies()].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    this._mostCommentedMovies = [...this._moviesModel.getMovies()].sort((a, b) => {
      if (a.comments.length < b.comments.length) return 1;
      if (a.comments.length === b.comments.length) return 0;
      if (a.comments.length > b.comments.length) return -1;
    });

    this._menuController.render();
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);
    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }

    this._renderMovies(movies, this._movieList, this._mainMovieContainer, this._showingMoviesCount, this._showedMoviesControllers);

    // top rated list movies
    if (this._topRatedMovies[0].rating > 0 || this._topRatedMovies[1].rating > 0) {
      this._renderMovies(this._topRatedMovies, this._topRatedList, this._topRatedContainer, this._showingExtraCards, this._showedMoviesControllersExtra);
    }
    // most commented list movies
    if (this._mostCommentedMovies[0].comments.length > 0 || this._mostCommentedMovies[1].comments.length > 0) {
      this._renderMovies(this._mostCommentedMovies, this._mostCommentedList, this._mostCommentedContainer, this._showingExtraCards, this._showedMoviesControllersExtra);
    }
    this._renderLoadMoreButton();
    appendChild(this._container, this._stats);
  }

  _renderMovies(movies, properMovieList, properMovieListContainer, count, controllersArray, position = RenderPosition.BEFOREEND) {
    render(this._movieSectionComponent.getElement(), properMovieList, position);
    const newArray = renderMovies(movies.slice(0, count), this._movieSectionComponent, properMovieListContainer, this._onDataChange, this._profile, this._commentsModel);

    controllersArray = controllersArray.concat(newArray);
  }

  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => movieController.destroy());
    this._showedMoviesControllers = [];
  }

  _updateMovies() {
    const movies = this._moviesModel.getMovies();
    this._removeMovies();
    this._mainMovieContainer.innerHTML = ``;
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._renderMovies(movies, this._movieList, this._mainMovieContainer, this._showingMoviesCount, this._showedMoviesControllers, RenderPosition.AFTERBEGIN);
    this._renderLoadMoreButton();
  }

  _onDataChange(movieController, oldData, newData, commonContainer, properContainer) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData, commonContainer, properContainer);
    }
  }

  _renderLoadMoreButton() {
    const movies = this._moviesModel.getMovies();
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= movies.length) {
      return;
    }
    render(this._movieList.getElement(), this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._mainMovieContainer.innerHTML = ``;
    const sortedMovies = getSortedMovies(this._moviesModel.getMovies(), sortType, 0, this._showingMoviesCount);
    const newMovies = renderMovies(sortedMovies, this._movieSectionComponent, this._mainMovieContainer, this._onDataChange);
    this._removeMovies();
    this._showedMoviesControllers = newMovies;

    this._renderLoadMoreButton();
  }

  _onShowMoreButtonClick() {
    const movies = this._moviesModel.getMovies();
    const prevMovieCards = this._showingMoviesCount;
    this._showingMoviesCount += SHOWING_MOVIES_COUNT_BY_BUTTON;

    const sortedMovies = getSortedMovies(movies, this._sortComponent.getSortType(), prevMovieCards, this._showingMoviesCount);

    const newMovies = this._renderMovies(sortedMovies, this._movieList, this._mainMovieContainer, this._showingMoviesCount, this._showedMoviesControllers, RenderPosition.AFTERBEGIN);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);

    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onMenuChange() {
    this._updateMovies();
  }
}
