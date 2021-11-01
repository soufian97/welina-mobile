import data from '../data/cours.json';
import { save } from './storage';

export const storeData = () => {
  let keys = [];
  data.map((item) => {
    save(
      item.flashcard,
      item.questions.map((question) => {
        return { id: question.id, status: question.status };
      }),
    );
    keys = keys.concat({
      key: item.flashcard,
      value: item.questions.length,
    });
  });
  return keys;
};

export const getStoredData = (filter) => {
  let keys = [];
  data.map((item) => {
    if (item.flashcard.includes(filter)) {
      keys = keys.concat({
        key: item.flashcard,
        value: item.questions.length,
      });
    }
  });
  return keys;
};
