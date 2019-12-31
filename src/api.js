const axios = require('axios');

// URL localhost
let url = 'http://localhost:4000/';

function getPosts() {
  // Make a request for a user with a given ID
  return axios
    .get(url + 'posts')
    .then(function (response) {
      // handle success
      const posts = response.data;
      return posts;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

module.exports = {getPosts};
