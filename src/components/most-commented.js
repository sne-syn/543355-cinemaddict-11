import {
  createMostCommentedTemplate
} from './../templates/most-commented-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MostCommented extends AbstractComponent {
  constructor() {
    super();
    this._container = this.getElement().querySelector(`.films-list__container`);
    this.getListContainer = function () {
      return this._container;
    };
  }

  getTemplate() {
    return createMostCommentedTemplate();
  }
}
