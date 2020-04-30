import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentController from "./comment-controller.js";

import {
  render,
  remove,
  appendChild,
  removeChild
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

// create comments list
const controller = new CommentController();
const renderCommentList = (movie) => {
  const commentListElement = document.querySelector(`.film-details__comments-list`);
  const comments = generateComments(movie.comments);
  commentListElement.innerHTML = ``;
  return comments.map((comment) => {
    controller.renderComment(comment, commentListElement);
    return controller;
  });
};

const generateCommentWrap = (movie) => {
  const comm = document.querySelector(`.film-details__comments-wrap`);
  renderCommentList(movie);
  controller.renderNewCommentInput(comm);
};

export default class MovieController {
  constructor(properContainer) {
    this._comments = [];
    this._properContainer = properContainer;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _showMovieDetails(movie, commonContainer) {
    appendChild(commonContainer.getElement(), this._detailsComponent);
    generateCommentWrap(movie);
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
