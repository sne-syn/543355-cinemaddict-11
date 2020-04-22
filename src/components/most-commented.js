import {createMostCommentedTemplate} from './../templates/most-commented-template.js';
import AbstractComponent from "./abstract-component.js";

export default class MostCommented extends AbstractComponent {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}
