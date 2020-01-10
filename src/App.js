import React, {Component} from 'react';
import './App.css';
import {getPosts} from './api.js';
import List from './components/List';
import Header from './components/Header';

class App extends Component {

//*********************************
//PROJEKTKOD
//*********************************
  state = {};

  async componentDidMount() {
    const data = await getPosts();
    console.log(data);
    this.setState({posts : data});
  }

// Render är en lifecycle method och är den enda metod som är
// obligatorisk eftersom den renderar till webbläsaren.
  render() {
      // console.log(this.state.posts);
    return (
      <div className="App">
        <Header />
        <div className="list">
          {/*Inkluderar komponenten List och skickar state-innehållet som props till List.*/}
          <List
            posts = {this.state.posts}
          />
        </div>
      </div>
    );
  }
}
export default App;
