import CommentComponent from "./../components/comment.js";

import {render,remove, appendChild,removeChild} from "./../utils/render.js";
import {generateComments} from "./../mock/comment.js";

export default class CommentController {
  constructor(container) {
    this._container = container;
    this._commentComponent = null;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);

    render(this._container, this._commentComponent);
  }
}
