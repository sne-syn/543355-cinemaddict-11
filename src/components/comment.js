import {createCommentTemplate} from './../templates/comment-template.js';
import AbstractComponent from "./abstract-component.js";


export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
