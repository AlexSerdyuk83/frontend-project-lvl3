import axios from 'axios';
import isEmpty from 'lodash/isEmpty.js';
import validate from './validate';

const getUrl = (fields) => {
  const formData = new FormData(fields);
  return formData.get('url');
};

export default () => {
  const state = {
    inputUrl: {},
    error: '',
    isValid: false,
    fids: [
      // {title: '', description: '', posts: []},
    ],
  };

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    state.inputUrl.url = getUrl(e.target);
    const validationResult = validate(state.inputUrl);

    if (isEmpty(validationResult)) {
      state.isValid = true;
      axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(state.inputUrl.url)}`)
        .then((response) => {
          const parser = new DOMParser();
          const fids = parser.parseFromString(response.data.contents, 'text/xml');
          console.log(fids);
        })
        .catch(() => console.log('Network response was not ok.'));
    } else {
      state.inputUrl.url = {};
      state.isValid = false;
      state.error = 'The link must be a valid URL';
    }
  });
};
