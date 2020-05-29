import MenuController from "./../controller/menu-controller";
import {
  SortType
} from "./../utils/const";
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

const renderMovieController = (moviesSelection, commonContainer, properMovieListContainer, onDataChange, profile, commentsModel) => {
  return moviesSelection.map((movie) => {
    const movieController = new MovieController(onDataChange, commonContainer, profile, commentsModel);
    movieController.render(movie, properMovieListContainer);
    return movieController;
  });
};

const sortMostCommentedMovies = (a, b) => {
  switch (true) {
    case (a.comments.length < b.comments.length):
      return 1;
    case (a.comments.length === b.comments.length):
      return 0;
    case (a.comments.length > b.comments.length):
      return -1;
  }
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
    case SortType.COMMENTED:
      sortedMovies = [...movies].sort((a, b) => sortMostCommentedMovies(a, b));
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
    this._showedMoviesControllersTop = [];
    this._showedMoviesControllersComments = [];
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
    this._removeMovies = this._removeMovies.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._renderExtraMoviesLists = this._renderExtraMoviesLists.bind(this);
    this._mainMovieContainer = this._movieList.getListContainer();
    this._topRatedContainer = this._topRatedList.getListContainer();
    this._mostCommentedContainer = this._mostCommentedList.getListContainer();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setMenuChangeHandler(this._onMenuChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();
    this._menuController.render();
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);
    appendChild(this._container, this._stats);
    if (movies.length === 0) {
      render(this._movieSectionComponent.getElement(), this._noMoviesComponent);
      return;
    }

    render(this._movieSectionComponent.getElement(), this._movieList, RenderPosition.BEFOREEND);
    const newMovies = renderMovieController(movies.slice(0, this._showingMoviesCount), this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._profile, this._commentsModel);
    this._showedMoviesControllers = newMovies;

    this._renderExtraMoviesLists(movies);
    this._renderLoadMoreButton();
  }

  _renderExtraMoviesLists(movies) {
    this._topRatedMovies = getSortedMovies(movies, SortType.RATING, 0, this._showingExtraCards);
    if (this._topRatedMovies[0].rating > 0 || this._topRatedMovies[1].rating > 0) {
      this._renderMovies(this._topRatedMovies, this._topRatedList, this._topRatedContainer, this._showingExtraCards, this._showedMoviesControllersTop);
    }
    this._mostCommentedMovies = getSortedMovies(movies, SortType.COMMENTED, 0, this._showingExtraCards);
    if (this._mostCommentedMovies[0].comments.length > 0 || this._mostCommentedMovies[1].comments.length > 0) {
      this._renderMovies(this._mostCommentedMovies, this._mostCommentedList, this._mostCommentedContainer, this._showingExtraCards, this._showedMoviesControllersComments);
    }
  }

  _renderMovies(movies, properMovieList, properMovieListContainer, count, controllersColection, position = RenderPosition.BEFOREEND) {
    render(this._movieSectionComponent.getElement(), properMovieList, position);
    const newMovies = renderMovieController(movies.slice(0, count), this._movieSectionComponent, properMovieListContainer, this._onDataChange, this._profile, this._commentsModel);
    controllersColection = controllersColection.concat(newMovies);
    return controllersColection;
  }

  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => {
      movieController.destroy();
    });
    this._showedMoviesControllers = [];
  }

  _onDataChange(oldData, newData) {

    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    const moviesOnRender = this._moviesModel.getMoviesAll();
    const sortType = this._sortComponent.getSortType();

    if (isSuccess) {
      this._mostCommentedContainer.innerHTML = ``;
      this._topRatedContainer.innerHTML = ``;
      this._mainMovieContainer.innerHTML = ``;
      const showedMoviesControllers = this._showedMoviesControllers.length;
      this._renderExtraMoviesLists(moviesOnRender);
      this._removeMovies();
      render(this._movieSectionComponent.getElement(), this._movieList, RenderPosition.AFTERBEGIN);
      const sortedMovies = getSortedMovies(this._moviesModel.getMovies(), sortType, 0, showedMoviesControllers);
      const newMovies = renderMovieController(sortedMovies, this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._profile, this._commentsModel);
      this._showedMoviesControllers = newMovies;
      const active = this._menuController.activeMenu();
      this._menuController.markMenuActive(active);
      this._renderLoadMoreButton();
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
    const newMovies = renderMovieController(sortedMovies, this._movieSectionComponent, this._mainMovieContainer, this._onDataChange, this._profile, this._commentsModel);
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
    this._showedMoviesControllers = newMovies;
    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onMenuChange() {
    const sortType = this._sortComponent.setSortType();
    this._onSortTypeChange(sortType);
    this._sortComponent.setDefaultSortTypeView();
  }
}
