import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";

import {
  render,
  appendChild,
  removeChild
} from "./../utils/render.js";
import CommentsController from "./comments-controller.js";



export default class MovieController {
  constructor(properContainer, onDataChange) {
    this._properContainer = properContainer;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
  }

  _showMovieDetails(movie, commonContainer) {
    appendChild(commonContainer.getElement(), this._detailsComponent);

    this._detailsComponent.setWatchlistButtonClickHandler(() => {
      console.log('Watchlist');
    });

    this._detailsComponent.setAlreadyWatchedButtonClickHandler(() => {
      console.log('Already Watched');
    });

    this._detailsComponent.setFavoriteButtonClickHandler(() => {
      console.log('Favorite');
    });

    const cont = document.querySelector(`.form-details__bottom-container`);
    const commentsController = new CommentsController(cont);
    commentsController.render(movie);
  }

  _closeMovieDetails(commonContainer) {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    removeChild(commonContainer.getElement(), this._detailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(movie, commonContainer) {
    this._cardComponent = new MovieCardComponent(movie);
    this._detailsComponent = new MovieDetailsComponent(movie);

    this._cardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._cardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(movie, Object.assign({}, movie, {
        isAlreadyWatched: !movie.isAlreadyWatched,
      }));
    });

    this._cardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(movie, Object.assign({}, movie, {
        isInFavorites: !movie.isInFavorites,
      }));
    });

    this._cardComponent.setOnCardClickHandler(() => {
      this._showMovieDetails(movie, commonContainer);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._detailsComponent.setCloseButtonClickHandler(() => {
      this._closeMovieDetails(commonContainer);
    });

    render(this._properContainer, this._cardComponent);
  }
}
