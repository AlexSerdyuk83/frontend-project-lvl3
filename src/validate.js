import * as yup from 'yup';
import keyBy from 'lodash/keyBy.js';

const schema = yup.object().shape({
  url: yup.string().url(),
});

export default (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};
