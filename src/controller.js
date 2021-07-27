import axios from 'axios';
import isEmpty from 'lodash/isEmpty.js';
import validate from './validate';
import parser from './parser';

const getUrl = (fields) => {
  const formData = new FormData(fields);
  return formData.get('url');
};

export default () => {
  const state = {
    inputUrl: {},
    error: '',
    isValid: false,
    feeds: [
      // {id: '', title: '', description: ''},
    ],
    posts: [
      // {id: '', title: '', description: '', link: ''},
    ],
  };

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    state.inputUrl.url = getUrl(e.target);
    const validationResult = validate(state.inputUrl);

    if (isEmpty(validationResult)) {
      form.reset();

      state.isValid = true;
      const url = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(state.inputUrl.url)}`;

      axios.get(url)
        .then((response) => {
          const { feedData, posts } = parser(response.data.contents);

          state.feeds.push(feedData);
          posts.forEach((post) => state.posts.push(post));
        })
        .catch(() => console.log('Network response was not ok.'));
    } else {
      state.inputUrl.url = {};
      state.isValid = false;
      state.error = 'The link must be a valid URL';
    }
  });
};
