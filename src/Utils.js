import { v4 as uuidv4 } from 'uuid';

const Utils = {
  getConfig: (path) => {
    return new Promise((resolve) => {
      fetch(path).then((response) => {
        response.json().then((res) => {
          resolve(res);
        });
      });
    });
  },
  generateId: () => `id_${uuidv4()}`
};

export default Utils;
