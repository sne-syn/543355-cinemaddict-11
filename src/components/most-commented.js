import {createMostCommentedTemplate} from './../templates/most-commented-template.js';
import ListComponent from "./list-component.js";

export default class MostCommented extends ListComponent {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}
