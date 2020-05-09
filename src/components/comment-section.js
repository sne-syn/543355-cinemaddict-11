import {
  createDetailsCommentTemplate
} from '../templates/comment-section-template';
import AbstractComponent from "./abstract-component.js";

const keyCodes = {
  CTRL: 17,
  ENTER: 13,
};
let flag = false;
export default class CommentSectionComponent extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._movie);
  }

  addCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === keyCodes.CTRL) flag = true;
      if (evt.keyCode === keyCodes.ENTER && flag) {
        flag = false;
        handler(this._movie);
        this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this.getElement().querySelector(`.film-details__comment-input`).value = ``;
      }
    });
  }

  deleteCommentHandler(handler) {}

  addEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
  }
}
