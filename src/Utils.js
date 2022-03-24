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
};

export default Utils;
