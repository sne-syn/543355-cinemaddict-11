import {
  createCommentTemplate
} from './../templates/comment-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Comment extends AbstractComponent {
  constructor(comment, movie) {
    super();
    this._movie = movie;
    this._comment = comment;
    this._deleteCommentHandler = null;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteCommentHandler(handler) {
    this._element.addEventListener(`click`, (evt) => {
      handler(evt, this._movie, this._comment);
    });
    this._deleteCommentHandler = handler;
  }
}
