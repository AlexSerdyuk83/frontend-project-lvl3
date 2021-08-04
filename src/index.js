// @ts-check
import 'bootstrap/dist/css/bootstrap.css';
import handler from './handler';

const render = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', handler);
};

render();
