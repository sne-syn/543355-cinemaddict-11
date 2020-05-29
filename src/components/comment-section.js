import {
  createDetailsCommentTemplate
} from '../templates/comment-section-template';
import AbstractSmartComponent from "./abstract-smart-component.js";

const keyCodeEnter = 13;
export default class CommentSectionComponent extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    //this._comments = movie.comments;
    this._addCommentHandler = null;
    this._addEmojiHandler = null;
    this._emojiLabelInput = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this._commentTextInput = this.getElement().querySelector(`.film-details__comment-input`);
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._movie);
    // return createDetailsCommentTemplate(Object.assign({}, this._movie, {comments: this._comments}));
  }

  recoveryListeners() {
    this._emojiLabelInput = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this._commentTextInput = this.getElement().querySelector(`.film-details__comment-input`);
    this.setAddCommentHandler(this._addCommentHandler);
    this.setAddEmojiHandler(this._addEmojiHandler);
  }

  rerender() {
    super.rerender();
  }

  _resetInput() {
    this._emojiLabelInput.innerHTML = ``;
    this._commentTextInput.value = ``;
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojis.forEach((emoji) => {
      emoji.checked = false;
    });
  }

  setAddCommentHandler(handler) {
    this._commentTextInput.addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.keyCode === keyCodeEnter) {
        if (this._emojiLabelInput.innerHTML !== `` &&
          this._commentTextInput.value !== ``) {
          handler(this._movie);
          this._resetInput();
        }
      }
    });
    this._addCommentHandler = handler;
  }

  setAddEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
    this._addEmojiHandler = handler;
  }
}
