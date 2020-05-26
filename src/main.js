import ProfileComponent from "./components/profile.js";
import PageController from "./controller/page-controller.js";
import MovieCountComponent from "./components/movie-count";
import MoviesModel from "./models/movies-model.js";
import CommentsModel from "./models/comments-model.js";

import {
  generateMovie
} from "./mock/movie.js";
import {
  generateProfile
} from "./mock/profile.js";
import {
  render
} from "./utils/render.js";
import {
  generateComments
} from "./mock/comment.js";

const movies = generateMovie(10);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);
const profile = generateProfile(moviesModel.getMoviesAll());

const comments = generateComments(10);
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

// render main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new ProfileComponent(profile));
render(footerStatisticsElement, new MovieCountComponent());

// call pageController
const pageController = new PageController(siteMainElement, profile, moviesModel, commentsModel);
pageController.render();
