import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {
  render
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

const keyCodes = {
  CTRL: 17,
  ENTER: 13,
};

let flag = false;

export default class CommentsController {
  constructor(container, profile) {
    this._container = container;
    this._profile = profile;
    this._commentComponent = null;
    this._commentSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._createNewCommentValue = this._createNewCommentValue.bind(this);
  }

  render(movie) {
    this._comments = generateComments(movie.comments);
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);
    if (movie.comments > 0) {
      this._renderCommentList(movie);
    }

    this._commentSection.addEmojiHandler(this._changeEmoji);
    document.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._addCommentHandler);
  }

  _renderCommentList() {
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    this._comments.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      render(commentListElement, commentComponent);
    });
  }

  _changeEmoji(evt) {
    const addEmojiLabel = document.querySelector(`.film-details__add-emoji-label`);

    let emojiImg = document.createElement(`img`);
    emojiImg.src = `./images/emoji/${evt.target.value}.png`;
    emojiImg.width = `55`;
    emojiImg.height = `55`;
    addEmojiLabel.innerHTML = ``;
    addEmojiLabel.appendChild(emojiImg);
  }

  _createNewCommentValue() {
    const newComment = {
      emoji:`smile`,
      text: document.querySelector(`.film-details__comment-input`).value,
      author: this._profile.rating,
      date: new Date(),
    };
    console.log(newComment);
    return newComment;
  }

  _addCommentHandler(evt) {
    if (evt.keyCode === keyCodes.CTRL) flag = true;
    if (evt.keyCode === keyCodes.ENTER && flag) {
      flag = false;
      this._createNewCommentValue();
    }
  }

}
