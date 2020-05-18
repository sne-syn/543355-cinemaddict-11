import {getMoviesByMenu} from "./../utils/menu";
import {MenuType} from "./../utils/const.js";

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._activeMenuType = MenuType.ALL;

    this._dataChangeHandlers = [];
    this._menuChangeHandlers = [];
  }

  getMovies() {
   // console.log(getMoviesByMenu(this._movies, this._activeMenuType))
    return getMoviesByMenu(this._movies, this._activeMenuType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setMenu(menuType) {
    this._activeMenuType = menuType;
    this._callHandlers(this._menuChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setMenuChangeHandler(handler) {
    this._menuChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
   this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
