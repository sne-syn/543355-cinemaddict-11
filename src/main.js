import ProfileComponent from "./components/user-profile.js";
import MenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import MovieSectionComponent from "./components/movies-section.js";
import MovieListComponent from "./components/movie-list.js";
import ShowMoreBtnComponent from "./components/show-more-btn.js";
import topRatedComponent from "./components/top-rated.js";
import MostCommentedComponent from "./components/most-commented.js";
import MovieCardComponent from "./components/movie-card.js";
import StatsComponent from "./components/statistics.js";
import MovieDetailesComponent from "./components/movie-detailes.js";
import CommentComponent from "./components/comment-component.js";

//import {generateComments} from "./mock/comment.js";
import {
  generateMenu
} from "./mock/menu.js";
import {
  generateMovie
} from "./mock/movie.js";
import {
  generateProfile
} from "./mock/profile.js";
import {
  RenderPosition,
  render
} from "./utils.js";

const MAIN_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
let showingMovieCardsCount = MAIN_CARD_COUNT;

const menuItems = generateMenu();
const profiles = generateProfile();
const movies = generateMovie(20);
//const comments = generateComments(movies[0].comments);
const movieSection = new MovieSectionComponent();

const renderMovie = (filmListElement, movie) => {
  const onCardClick = () => {
    movieSection.getElement().appendChild(movieDetailesComponent.getElement());
  };

  const onCloseButtonClick = () => {
    movieSection.getElement().removeChild(movieDetailesComponent.getElement());
  };

  const movieCardComponent = new MovieCardComponent(movie);


  const movieCard = movieCardComponent.getElement();
  movieCard.addEventListener(`click`, onCardClick);

  const movieDetailesComponent = new MovieDetailesComponent(movie);
  const closeButton = movieDetailesComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, onCloseButtonClick);
  render(filmListElement, movieCardComponent.getElement(), RenderPosition.BEFOREEND);
  //render(movieSection.getElement(), movieDetailesComponent.getElement(), RenderPosition.BEFOREEND);
  //movieSection.getElement().appendChild(movieDetailesComponent.getElement());
};


const mostCommentedMovies = [...movies].sort((a, b) => (a.comments < b.comments) ? 1 : -1);
const topRatedMovies = [...movies].sort((a, b) => (a.rating < b.rating) ? 1 : -1);


const renderMovieList = (movieList, movies, count) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  movies.slice(0, count).forEach((movie) => {
    renderMovie(filmListElement, movie);
  });
};

const renderMainMovieList = (movieList, movies) => {
  const filmListElement = movieList.getElement().querySelector(`.films-list__container`);
  renderMovieList(movieList, movies, showingMovieCardsCount);

  const showMoreButtonComponent = new ShowMoreBtnComponent();
  render(movieSection.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevMovieCards = showingMovieCardsCount;
    showingMovieCardsCount = showingMovieCardsCount + MAIN_CARD_COUNT;

    movies.slice(prevMovieCards, showingMovieCardsCount)
      .forEach((movie) => renderMovie(filmListElement, movie));

    if (showingMovieCardsCount >= movies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

// generate main content
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);


render(siteHeaderElement, new ProfileComponent(profiles).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, movieSection.getElement(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new StatsComponent().getElement(), RenderPosition.BEFOREEND);


const movieList = new MovieListComponent();
render(movieSection.getElement(), movieList.getElement(), RenderPosition.BEFOREEND);
renderMainMovieList(movieList, movies);

const topRatedList = new topRatedComponent();
render(movieSection.getElement(), topRatedList.getElement(), RenderPosition.BEFOREEND);
renderMovieList(topRatedList, topRatedMovies, EXTRA_CARD_COUNT);

const mostCommentedList = new MostCommentedComponent();
render(movieSection.getElement(), mostCommentedList.getElement(), RenderPosition.BEFOREEND);
renderMovieList(mostCommentedList, mostCommentedMovies, EXTRA_CARD_COUNT);

// const movieSection = new MovieSectionComponent();
// render(siteMainElement, movieSection.getElement(), RenderPosition.BEFOREEND);
// renderMainSection(movieSection);

// create movies section: main - top - commented
// const siteFilmElement = document.querySelector(`.films`);
// render(siteFilmElement, createMainMovieList(), RenderPosition.BEFOREEND);

// const firstCard = document.querySelector(`.film-card`);
// var removeDetails = () => {
//   var filmDetailesElem = document.querySelector(`.film-details`);
//   if (filmDetailesElem) {
//     filmDetailesElem.remove();
//   }
// };

// firstCard.addEventListener('click', () => {
//   render(footerElement, createDetailsTemplate(movies[0]), RenderPosition.AFTEREND);

//   //generate comments
//   const commentListElement = document.querySelector(`.film-details__comments-list`);

//   const commentsCount = movies[0].comments;
//   for (let i = 0; i < commentsCount; i++) {
//     render(commentListElement, createCommentTemplate(comments[i]), RenderPosition.BEFOREEND);
//   }

//   let button = document.querySelector(`.film-details__close-btn`);
//   button.addEventListener(`click`, removeDetails);
// });
