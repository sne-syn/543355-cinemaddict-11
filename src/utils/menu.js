import {MenuType} from "./const";

export const getMoviesFromWatchlist = (movies) => {
  return movies.filter((movie) => movie.isInWatchlist);
};

export const getWatchHistory = (movies) => {
  return movies.filter((movie) => movie.isAlreadyWatched);
};

export const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => movie.isInFavorites);
};

export const getMoviesByMenu = (movies, menuType) => {
  switch (menuType) {
    case MenuType.ALL:
      return movies;
    case MenuType.WATCHLIST:
      return getMoviesFromWatchlist(movies);
    case MenuType.HISTORY:
      return getWatchHistory(movies);
    case MenuType.FAVORITES:
      return getFavoritesMovies(movies);
  }

  return movies;
};
