import CommentComponent from "./../components/comment.js";
import NewComment from "./../components/new-comment-component.js";
import {render} from "./../utils/render.js";

export default class CommentController {
  constructor() {
    this._commentComponent = null;
    this._newCommentComponent = null;
  }

  renderComment(comment, container) {
    this._commentComponent = new CommentComponent(comment);
    render(container, this._commentComponent);
  }

  renderNewCommentInput(container) {
    this._newComponent = new NewComment();
    render(container, this._newComponent);
  }
}
