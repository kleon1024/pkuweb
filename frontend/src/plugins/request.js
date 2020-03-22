const axios = require("axios");
axios.defaults.withCredentials = true;

import store from "../store";

export default {
  post(url, data, callback) {
    if (store.state.loginUser && store.state.loginUser.id) {
      data.added_user_id = store.state.loginUser.id;
    }
    axios
      .post(url, data)
      .then(res => {
        // renew the session
        store.dispatch("renewSession");
        callback(null, res);
      })
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        console.log(err.config);
        callback(err, null);
      });
  },

  get(url, params, callback) {
    if (store.state.loginUser.id) {
      params.push({
        name: "added_user_id",
        value: store.state.loginUser.id
      });
    }

    axios
      .get(url)
      .then(res => {
        store.dispatch("renewSession");
        callback(null, res);
      })
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        console.log(err.config);
        callback(err, null);
      });
  }
};
