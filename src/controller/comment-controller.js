import CommentComponent from "./../components/comment.js";

import {render,remove, appendChild,removeChild} from "./../utils/render.js";
import {generateComments} from "./../mock/comment.js";

export default class CommentController {
  constructor(container) {
    this._container = container;
  }

  render(comment) {
    // renderComment(this._container, comment);
  }
}
