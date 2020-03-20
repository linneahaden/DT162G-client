const axios = require('axios');

// URL localhost
// let url = 'http://localhost:4000/';

// URL remote api
let url = 'https://dt162g-server.herokuapp.com/';

//************************************
//Get all posts
//************************************
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

//************************************
//Get all categories
//************************************
function getCategories() {
  return axios
    .get(url + 'category')
    .then(function (response) {
      // handle success
      const categories = response.data;
      return categories;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// Upvote post: Assigns body and calls updatePostRequest();
//************************************
function voteUpRequest(_id) {
  const body = {"votesUp" : true}
  return updatePostRequest(_id, body);
}

//************************************
// Downvote post: Assigns body and calls updatePostRequest();
//************************************
function voteDownRequest(_id) {
  const body = {"votesDown" : true}
  return updatePostRequest(_id, body);
}

//************************************
// Update post (not votes)
//************************************
function updatePostRequest(_id, body) {
  return axios
    .put(url + 'posts/' + _id, body)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// New post
//************************************
function newPost(data) {
  return axios
    .post(url + 'posts/', data)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// Delete post
//************************************
function deletePostRequest(_id) {
  return axios
    .delete(url + 'posts/' + _id)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// New comment
//************************************
function newComment(postId, data) {
  return axios
    .post(url + 'posts/' + postId + '/comment', data)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// Update comment
//************************************
function updateCommentRequest(_id, commentId, body) {
  return axios
    .put(url + 'posts/' + _id + '/comment/' + commentId, body)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// Delete comment
//************************************
function deleteCommentRequest(_id, commentId) {
  return axios
    .delete(url + 'posts/' + _id + '/comment/' + commentId)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}

//************************************
// New category
//************************************
function newCategoryRequest(data) {
  return axios
    .post(url + 'category', data)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    })
}


module.exports = {
  getPosts,
  getCategories,
  voteUpRequest,
  updatePostRequest,
  voteDownRequest,
  newPost,
  deletePostRequest,
  newComment,
  updateCommentRequest,
  deleteCommentRequest,
  newCategoryRequest
};
