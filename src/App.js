import React, {Component} from 'react';
import './App.css';
import {getPosts, deletePostRequest, getCategories, deleteCommentRequest, newCategoryRequest} from './api.js';
import {sortPostsByVotes} from './utilities.js';
import List from './components/List';
import Header from './components/Header';
import SinglePost from './components/SinglePost';
import Compose from './components/Compose';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  state = {};

  async componentDidMount() {
    let data = await getPosts();
    console.log(data);
    //Skickar datan för sortering
    sortPostsByVotes(data);
    this.setState({posts : data});
    let categorydata = await getCategories();
    console.log(categorydata);
    this.setState({categories : categorydata});
  }


  // Delete post and update state and re-render List component
  deletePost = async (_id) => {
    // console.log(_id);
    // console.log(this.state);

    // Efterfrågar hela listan med inlägg
    if(await deletePostRequest(_id)) {
      let data = await getPosts();
      //Skickar datan för sortering
      sortPostsByVotes(data);
      this.setState({ posts: data });
      // console.log(this.state);
    }
  };

  // Delete comment and update state and re-render CommentList component
  deleteComment = async (_id, commentId) => {
     //console.log(_id);
     //console.log(commentId);

    // Efterfrågar hela listan med inlägg
    if(await deleteCommentRequest(_id, commentId)) {
      let data = await getPosts();
      this.setState({ posts: data });
    }
  };

  // Create new category
  createCategory = async (body) => {
    if(await newCategoryRequest(body)) {
      let data = await getCategories();
      this.setState({ categories: data });
    }
  }

// Render är en lifecycle method och är den enda metod som är
// obligatorisk eftersom den renderar till webbläsaren.
  render() {
      // console.log(this.state.posts);
    return (

      <div className="App">

        <Router>
          <Header />
          <Switch>

            <Route exact path="/">
              <div className="list">
                {/*Inkluderar komponenten List och skickar state-innehållet som props till List.*/}
                <List
                  posts = {this.state.posts}
                  deletePost={this.deletePost}
                  categories = {this.state.categories}
                />
              </div>
            </Route>
            <Route exact path="/post/:id" render={(props) =>
              <SinglePost {...props}
                posts = {this.state.posts}
                deletePost={this.deletePost}
                deleteComment={this.deleteComment}
                categories = {this.state.categories}
              />
            }>

            </Route>

            <Route exact path="/compose">
              <Compose
              categories = {this.state.categories}
              createCategory = {this.createCategory}
              />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
