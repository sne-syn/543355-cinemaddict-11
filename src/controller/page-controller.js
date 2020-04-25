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
import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentComponent from "./../components/comment.js";
import NoMoviesComponent from "./../components/no-movies.js";

import {
  generateComments
} from "./../mock/comment.js";
import {
  render,
  remove,
  appendChild,
  removeChild
} from "./../utils/render.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

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

const renderMovie = (listContainer, movie, section) => {
  const showMovieDetails = () => {
    appendChild(section.getElement(), movieDetailsComponent);
    // render comments
    renderCommentList(movie);
  };

  const closeMovieDetails = () => {
    removeChild(section.getElement(), movieDetailsComponent);
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
  render(listContainer, movieCardComponent);
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

  return sortedMovies;
};

export default class PageController {
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

  _showMoviesLists() {
    const isExist = !!(this._container && this._stats && this._movieSectionComponent && this._sortComponent);
    if (isExist && this._container.contains(this._stats.getElement())) {
      removeChild(this._container, this._stats);
      appendChild(this._container, this._sortComponent);
      appendChild(this._container, this._movieSectionComponent);
    }
  }

  render(movies) {
    render(this._container, this._menuComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._movieSectionComponent);

    const renderLoadMoreButton = (component, arr) => {
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevMovieCards = showingMovieCardsCount;
        showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

        arr.slice(prevMovieCards, showingMovieCardsCount)
          .forEach((movie) => renderMovie(component.listContainer, movie, this._movieSectionComponent));

        if (showingMovieCardsCount >= arr.length) {
          remove(this._showMoreButtonComponent);

        }
      });
    };

    // set events
    this._menuComponent.setStatsClickHandler((evt) => {
      this._showStats(evt);
    });
    this._menuComponent.setMenuClickHandler(() => {
      this._showMoviesLists();
    });

    const renderMovieList = (component, moviesSelection, count) => {
      moviesSelection.slice(0, count).forEach((movie) => {
        renderMovie(component.listContainer, movie, this._movieSectionComponent);
      });
    };

    const renderMainMovieList = (component, movies) => {
      showingMovieCardsCount = MAIN_CARD_COUNT;
      remove(this._showMoreButtonComponent);
      movies.slice(0, showingMovieCardsCount).forEach((movie) => {
        renderMovie(component.listContainer, movie, this._movieSectionComponent);
      });
      render(component.getElement(), this._showMoreButtonComponent);

      renderLoadMoreButton(component, movies);

      // ===============================

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        showingMovieCardsCount = MAIN_CARD_COUNT;
        remove(this._showMoreButtonComponent);
        const sortedMovies = getSortedMovies(movies, sortType, 0, showingMovieCardsCount);

        component.listContainer.innerHTML = ``;
        sortedMovies.slice(0, showingMovieCardsCount).forEach((movie) => {
          renderMovie(component.listContainer, movie, this._movieSectionComponent);
        });

        render(component.getElement(), this._showMoreButtonComponent);
        renderLoadMoreButton(component, sortedMovies);
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
