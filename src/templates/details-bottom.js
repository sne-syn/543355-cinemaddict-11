export const createDetailsCommentTemplate = (movie) => {
 const {comments} = movie;

 return `<div class="form-details__bottom-container">
 <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

 <ul class="film-details__comments-list"></ul>

 </section></div>`;
};
