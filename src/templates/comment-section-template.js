const emojis = [`smile`, `sleeping`, `puke`, `angry`];

const createEmojiInput = (emojiName) => {
  return `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
  <label class="film-details__emoji-label" for="emoji-${emojiName}">
  <img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">
  </label>`;
};

const createNewCommentTemplate = () => {
  const emojiList = emojis.map((it) => createEmojiInput(it)).join(`\n`);
  return `<div class="film-details__new-comment">
  <div for="add-emoji" class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>
  <div class="film-details__emoji-list">${emojiList}</div>
  </div>`;
};

export const createDetailsCommentTemplate = (movie) => {
  const {comments} = movie;
  const newComment = createNewCommentTemplate();
   return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>
    <ul class="film-details__comments-list"></ul>
    ${newComment}
    </section>`;
};


