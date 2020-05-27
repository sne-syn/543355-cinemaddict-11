import MenuController from "./../controller/menu-controller";
import {
  SortType
} from "./../templates/sort-template.js";
import SortComponent from "./../components/sort.js";
import StatsComponent from "./../components/stats.js";
import MovieSectionComponent from "./../components/movies-section.js";
import MovieListComponent from "./../components/movie-list";
import ShowMoreBtnComponent from "./../components/show-more-btn.js";
import NoMoviesComponent from "./../components/no-movies.js";
import MovieController from "./movie-controller.js";
import {
  render,
  remove,
  appendChild,
  RenderPosition
} from "./../utils/render.js";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderMovieController = (moviesSelection, container, onDataChange, profile, commentsModel) => {
  return moviesSelection.map((movie) => {
    const movieController = new MovieController(container,onDataChange, profile, commentsModel);
    movieController.render(movie);
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
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._menuController = new MenuController(container, moviesModel);
    this._sortComponent = new SortComponent();
    this._movieSectionComponent = new MovieSectionComponent();
    this._movieList = new MovieListComponent();
    this._showMoreButtonComponent = new ShowMoreBtnComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._stats = new StatsComponent(moviesModel.getMovies(), this._profile);
    this._renderNoMoviesInfo = this._renderNoMoviesInfo.bind(this);
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._removeMovies = this._removeMovies.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._updateMovies = this._updateMovies.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setMenuChangeHandler(this._onMenuChange);
    this._movieContainer = this._movieList.getContainer();
  }

  render() {
    console.log(this._container);
    const movies = this._moviesModel.getMovies();

    this._sortMoviesForExtraSections(movies);
    this._menuController.render();
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);
    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }
    this._renderMovies(movies, this._movieList, this._showingMoviesCount, this._showedMoviesControllers);

    this._renderLoadMoreButton();
    appendChild(this._container, this._stats);
  }

  _renderNoMoviesInfo(movies) {
    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }
  }

  _renderMovies(movies, properMovieList, count, controllersArray, position = RenderPosition.BEFOREEND) {
    render(this._movieSectionComponent.getElement(), properMovieList, position);
    const newArray = renderMovieController(movies.slice(0, count), this._movieContainer, this._onDataChange, this._profile, this._commentsModel);
    controllersArray = controllersArray.concat(newArray);
    return controllersArray;
  }

  _sortMoviesForExtraSections(movies) {
    this._topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    this._mostCommentedMovies = [...movies].sort((a, b) => {
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      if (a.comments.length === b.comments.length) {
        return 0;
      }
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      return true;
    });
  }

  _removeMovies(controllers) {
    console.log(controllers);
    controllers.forEach((movieController) => {
      movieController.destroy();
    });
    controllers = [];
  }

  _updateMovies() {
    const movies = this._moviesModel.getMovies();
    const sortType = this._sortComponent.setSortType();
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._mainMovieContainer.innerHTML = ``;
    const sortedMovies = getSortedMovies(movies, sortType, 0, this._showingMoviesCount);
    const newMovies = renderMovieController(sortedMovies, this._movieSectionComponent, this._movieContainer, this._onDataChange, this._profile, this._commentsModel);
    this._removeMovies(this._showedMoviesControllers);
    this._showedMoviesControllers = newMovies;
    this._renderLoadMoreButton();
    this._sortComponent.setDefaultSortTypeView();
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    if (isSuccess) {}
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
    const newMovies = renderMovieController(sortedMovies, this._movieSectionComponent, this._movieContainer, this._onDataChange, this._profile, this._commentsModel);
    this._removeMovies(this._showedMoviesControllers);
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
