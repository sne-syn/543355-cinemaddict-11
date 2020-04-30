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
const renderCommentList = (movie, controller, commentListElement) => {
  const comments = generateComments(movie.comments);
  commentListElement.innerHTML = ``;
  return comments.map((comment) => {
    controller.renderComment(comment, commentListElement);
    return controller;
  });
};

const generateCommentWrap = (movie, comm, commentListElement) => {
  const controller = new CommentController();
  renderCommentList(movie, controller, commentListElement);
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
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    const comm = document.querySelector(`.film-details__comments-wrap`);
    generateCommentWrap(movie, comm, commentListElement);
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
