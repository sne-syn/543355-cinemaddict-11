import MenuComponent from "./../components/menu";
import StatsComponent from "./../components/stats";
import {
  MenuType
} from "./../utils/const.js";
import {
  render,
  replace,
  RenderPosition, appendChild, removeChild
} from "./../utils/render.js";
import {
  getMoviesByMenu
} from "./../utils/menu.js";

export default class MenuController {
  constructor(container, moviesModel, profile) {
    this._container = container;
    this._profile = profile;
    this._moviesModel = moviesModel;
    this._activeMenuType = MenuType.ALL;
    this._menuComponent = null;
    this._statsComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
    this._onStatsClick = this._onStatsClick.bind(this);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();

    const menuItems = Object.values(MenuType).map((menuType) => {
      return {
        name: menuType,
        count: getMoviesByMenu(allMovies, menuType).length,
      };
    });
    const oldComponent = this._menuComponent;

    this._menuComponent = new MenuComponent(menuItems);
    this._menuComponent.setMenuChangeHandler(this._onMenuChange);
    this._menuComponent.setStatsClickHandler(this._onStatsClick);

    if (oldComponent) {
      replace(this._menuComponent.getElement(), oldComponent.getElement());
    } else {
      render(container, this._menuComponent);
    }
  }

  _onStatsClick() {
    console.log('on menu');
    this._statsComponent = new StatsComponent(this._moviesModel.getMovies(), this._profile);
    render(this._container, this._statsComponent);
  }

  _onMenuChange(menuType) {
    this._moviesModel.setMenu(menuType);
    this._activeMenuType = menuType;
  }

  _onDataChange() {
    this.render();
  }

  markMenuActive(menuType) {
    this._activeMenuType = menuType;
    this._menuComponent.setActiveMenu(menuType);
  }

  activeMenu() {
    return this._activeMenuType;
  }
}
