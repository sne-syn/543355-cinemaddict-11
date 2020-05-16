import {createMenuTemplate} from './../templates/menu-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
    this.subscribeOnEvents = this.subscribeOnEvents.bind(this);

  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, handler);
  }

  setMenuClickHandler(handler) {
    this.getElement().querySelector(`a[href="#All"]`).addEventListener(`click`, handler);
  }

  subscribeOnEvents() {
    const menuNameByHref = this.getElement().addEventListener(`click`, (evt) => {
      console.log(evt.target);
    });

    console.log(menuNameByHref);
    const allItems = this.getElement().querySelector(`a[href="#All"]`);
    const watchlistItems = this.getElement().querySelector(`a[href="#Watchlist"]`);
    const historyItems = this.getElement().querySelector(`a[href="#History"]`);
    const favoritesItems = this.getElement().querySelector(`a[href="#Favorites"]`);

    allItems.addEventListener(`click`, () => {
      console.log(`all`);
    });

    watchlistItems.addEventListener(`click`, () => {
      console.log(`watchlist`);
    });

    historyItems.addEventListener(`click`, () => {
      console.log(`history`);
    });

    favoritesItems.addEventListener(`click`, () => {
     console.log(`favorites`);
    });
  }
}
