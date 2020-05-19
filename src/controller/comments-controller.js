import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {capitalizeEveryFirstChar} from "./../utils/common.js";
import {render, RenderPosition} from "./../utils/render.js";
import {generateComments} from "./../mock/comment.js";

export default class CommentsController {
  constructor(container, profile) {
    this._container = container;
    this._comments = [];
    this._userName = profile.rating;
    this._commentComponent = null;
    this._commentSection = null;
    this._newSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
  }

  render(movie) {
    this._comments = generateComments(movie.comments);
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection, RenderPosition.BEFOREEND);
    if (movie.comments > 0) {
      this._renderCommentList(this._comments);
    }

    this._commentSection.setAddEmojiHandler(this._changeEmoji);
    this._commentSection.setAddCommentHandler(this._addComment);
    this._commentSection.setDeleteCommentHandler(this._deleteComment);
  }

  _renderCommentList(comments) {
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    comments.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      render(commentListElement, commentComponent, RenderPosition.BEFOREEND);
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
    const newComment = {
      // find checked element for emoji
      emoji: `smile`,
      text: document.querySelector(`.film-details__comment-input`).value,
      author: (this._userName.length > 0) ? capitalizeEveryFirstChar(this._userName) : ``,
      date: new Date().toISOString(),
    };

    // updates movie.comments count by adding 1
    const newMovieInfo = Object.assign({}, movie, {
      comments: ++movie.comments
    });
    this._comments.push(newComment);
    this._renderCommentList(this._comments);
    this._commentSection.recoveryListeners();
  }

  _deleteComment(evt, movie) {
    const commentToRemove = evt.target.closest(`.film-details__comment`);
    commentToRemove.parentElement.removeChild(commentToRemove);
    // updates movie.comments count by adding 1
    const newMovieInfo = Object.assign({}, movie, {
      comments: --movie.comments
    });
  }
}
