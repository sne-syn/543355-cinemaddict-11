import {createDetailsCommentTemplate} from './../templates/details-bottom';
import AbstractComponent from "./abstract-component.js";

export default class commentSectionComponent extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._movie);
  }
}
