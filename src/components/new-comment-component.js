import {createNewCommentTemplate} from './../templates/new-comment';
import AbstractComponent from "./abstract-component.js";

export default class NewComment extends AbstractComponent {
  getTemplate() {
    return createNewCommentTemplate();
  }
}
