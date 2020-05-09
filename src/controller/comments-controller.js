import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {
  capitalizeEveryFirstChar
} from "./../utils/common.js";
import {
  render
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

const addLeadingZero = (value) => {
  return (value < 10) ? `0${value}` : value;
};

export default class CommentsController {
  constructor(container, profile) {
    this._container = container;
    this._comments = [];
    this._profile = profile;
    this._commentComponent = null;
    this._commentSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addComment = this._addComment.bind(this);
    this._update = this._update.bind(this);
  }

  render(movie) {
    this._comments = generateComments(movie.comments);
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);
    if (movie.comments > 0) {
      this._renderCommentList(this._comments);
    }

    this._commentSection.addEmojiHandler(this._changeEmoji);
    this._commentSection.addCommentHandler(this._addComment);
  }

  _update(movie) {
    let commentsFixed = movie.comments++;
    this._renderCommentList(this._comments);
    const newObj = Object.assign({}, movie, {comments: commentsFixed});
    this._commentSection = new CommentSectionComponent(newObj);
    render(this._container, this._commentSection);
    this._renderCommentList(this._comments);
  }

  _renderCommentList(comments) {
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    comments.forEach((comment) => {
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

  _addComment(movie) {
    let date = new Date();
    let formatedDate = `${date.getFullYear()}/${addLeadingZero(date.getMonth())}/${addLeadingZero(date.getDate())} ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
    const newComment = {
      emoji: `smile`,
      text: document.querySelector(`.film-details__comment-input`).value,
      author: capitalizeEveryFirstChar(this._profile.rating),
      date: formatedDate,
    };
    this._comments.push(newComment);
    this._update(movie);
  }
}
