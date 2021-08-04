import axios from 'axios';
import validate from './validate';
import parser from './parser';
import watchedState from './view';

const getUrl = (fields) => {
  const formData = new FormData(fields);
  return formData.get('url');
};

export default (e) => {
  e.preventDefault();

  watchedState.inputUrl = getUrl(e.target);
  const form = document.querySelector('form');

  const validationResult = validate({ url: watchedState.inputUrl });

  if (validationResult && !watchedState.validUrls.includes(watchedState.inputUrl)) {
    const url = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(watchedState.inputUrl)}`;

    axios.get(url)
      .then((response) => {
        form.reset();
        const { feedData, postsData } = parser(response.data.contents);

        watchedState.feeds.push(feedData);
        postsData.forEach((post) => watchedState.posts.unshift(post));
        watchedState.validUrls.push(watchedState.inputUrl);
        watchedState.isValid = 'succeed';
      })
      .catch(() => {
        watchedState.isValid = 'error';
      });
  } else if (validationResult && watchedState.validUrls.includes(watchedState.inputUrl)) {
    watchedState.isValid = 'exists';
  } else if (!validationResult) {
    watchedState.isValid = 'invalid';
  }
};
