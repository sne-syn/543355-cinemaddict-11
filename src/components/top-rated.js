import {createTopRatedTemplate} from './../templates/top-rated-template.js';
import AbstractComponent from "./abstract-component.js";

export default class TopRated extends AbstractComponent {
  getTemplate() {
    return createTopRatedTemplate();
  }
}

