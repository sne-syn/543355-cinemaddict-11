import {createTopRatedTemplate} from './../templates/top-rated-template.js';
import ListComponent from "./list-component.js";

export default class TopRated extends ListComponent {
  getTemplate() {
    return createTopRatedTemplate();
  }
}
