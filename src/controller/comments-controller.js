import CommentSection from "./../components/movie-details-comment.js";
import CommentComponent from "./../components/comment.js";
import NewComment from "./../components/new-comment-component.js";
import {
  render
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

export default class CommentsController {
  constructor(container) {
    this._container = container;
    this._commentSection = null;
    this._commentComponent = null;
    this._newCommentComponent = null;
    this._renderComment = this._renderComment.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);
    this._renderNewCommentInput = this._renderNewCommentInput.bind(this);
  }

  render(movie) {
    this._commentSection = new CommentSection(movie);
    render(this._container, this._commentSection);
    this._renderNewCommentInput(this._commentSection);

    if (movie.comments > 0) {
      this._renderCommentsList(movie, this._commentSection);
    }
  }

  _renderComment(comment, container) {
    this._commentComponent = new CommentComponent(comment);
    render(container, this._commentComponent);
  }

  _renderCommentsList(movie, commentSection) {
    const commentListContainer = commentSection.getElement().querySelector(`.film-details__comments-list`);
    const comments = generateComments(movie.comments);
    commentListContainer.innerHTML = ``;
    return comments.map((comment) => {
      this._renderComment(comment, commentListContainer);
      return this;
    });
  }

  _renderNewCommentInput(commentSection) {
    this._newComponent = new NewComment();
    render(commentSection.getElement().querySelector(`.film-details__comments-wrap`), this._newComponent);
  }
}
