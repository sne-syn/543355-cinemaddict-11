import {createMenuTemplate} from './../templates/menu-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();

    this._menuItems = menuItems;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }
}
