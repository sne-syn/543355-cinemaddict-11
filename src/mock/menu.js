import {capitalizeChar} from "../utils.js";

const menuNames = [`all`, `watchlist`, `history`, `favorites`];

const generateMenu = () => {
  return menuNames.map((name) => {
    return {
      name: capitalizeChar(name),
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateMenu};
