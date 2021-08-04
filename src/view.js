import onChange from 'on-change';
import state from './state';

const containerBuilder = (title, list) => `
  <div class="card border-0">
    <div class="card-body">
      <h2 class="card-title h4">${title}</h2>
    </div>
    ${list}
  </div>
`;

const ulElemBuilder = () => {
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  return feedsList;
};

const liElemContentBuilder = (title, description) => `
      <h3 class="h6 m-0">${title}</h3>
      <p class="m-0 small text-black-50">${description}</p>
`;

/* eslint no-param-reassign: "error" */
const getFeedback = (element, input, message) => {
  switch (message) {
    case 'default':
      element.innerHTML = '';
      break;
    case 'succeed':
      element.innerHTML = 'RSS успешно загружен';
      element.classList.remove('text-danger');
      element.classList.add('text-success');
      input.classList.remove('is-invalid');
      break;
    case 'exists':
      element.innerHTML = 'RSS уже существует';
      element.classList.add('text-danger');
      input.classList.add('is-invalid');
      break;
    case 'invalid':
      element.innerHTML = 'Введите валидный RSS';
      element.classList.add('text-danger');
      input.classList.toggle('is-invalid');
      break;
    case 'error':
      element.innerHTML = 'Ошибка сети';
      element.classList.add('text-danger');
      input.classList.toggle('is-invalid');
      break;
    default:
      break;
  }
};

const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');
const input = document.querySelector('input');
const feedbackElem = document.querySelector('.feedback');

const watchedState = onChange(state, (path) => {
  if (path === 'feeds') {
    const feedsList = ulElemBuilder();

    state.feeds.forEach((feed) => {
      const feedItem = document.createElement('li');
      feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

      feedItem.innerHTML = liElemContentBuilder(feed.title, feed.description);

      feedsList.prepend(feedItem);
    });
    feeds.innerHTML = containerBuilder('Фиды', feedsList.innerHTML);
  }

  if (path === 'posts') {
    const postsList = ulElemBuilder();

    state.posts.forEach((post) => {
      const postItem = document.createElement('li');
      postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      postItem.innerHTML = `
      <a href="${post.link}" class="fw-bold" target="_blank" rel="noopener noreferrer">${post.title}</a>
      <button type="button" class="btn btn-outline-primary btn-sm">Просмотр</button>
      `;

      postsList.append(postItem);
    });
    posts.innerHTML = containerBuilder('Посты', postsList.innerHTML);
  }

  if (path === 'isValid') {
    getFeedback(feedbackElem, input, state.isValid);
  }
});

export default watchedState;
