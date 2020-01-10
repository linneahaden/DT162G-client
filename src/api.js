const axios = require('axios');

// URL localhost
let url = 'http://localhost:4000/';

//Get call for all posts
function getPosts() {
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

// Put call for upvote
function voteUpRequest(_id) {
  const body = {"votesUp" : true}

  return axios
    .put(url + 'posts/' + _id, body)
    .then(function (response) {
      // handle success
      const post = response.data;
      return post;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

// Put call for downvote
function voteDownRequest(_id) {
  const body = {"votesDown" : true}

  return axios
    .put(url + 'posts/' + _id, body)
    .then(function (response) {
      // handle success
      const post = response.data;
      return post;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

module.exports = {getPosts, voteUpRequest, voteDownRequest};
