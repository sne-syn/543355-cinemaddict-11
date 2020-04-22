import {createShowMoreTemplate} from './../templates/show-more-btn-template.js';
import AbstractComponent from "./abstract-component.js";

export default class ShowMoreBtn extends AbstractComponent {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
