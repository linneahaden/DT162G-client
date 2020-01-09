import React, {Component} from 'react';
import './App.css';
import {getPosts} from './api.js';
import {voteUpRequest} from './api.js';
// import Todos from './components/Todos';
import List from './components/List';
import Header from './components/Header';

class App extends Component {

//*********************************
//GREJS FÖR TUTORIAL
//ta bort när jag fattat
//*********************************
// state = {
//   todos: [
//     {
//       id: 1,
//       title: 'Ta ut soporna.',
//       completed: false
//     },
//     {
//       id: 2,
//       title: 'Ta ut Dan.',
//       completed: true
//     }
//   ]
// }

//*********************************
//PROJEKTKOD
//*********************************
  state = {};

  async componentDidMount() {
    const data = await getPosts();
    console.log(data);
    this.setState({posts : data});
  }

  // Efterfrågar voteUpRequest från api.js
  // Fattar inte varför jag inte kan använda
  // arrow function för async.
  async voteUp(_id) {
    const data = await voteUpRequest(_id);
    console.log(_id);
    console.log(data);
    console.log(data._id);
    //Varför kommer man inte åt state från denna funktion?
    console.log(this.state);

    // this.setState( {posts : this.state.posts.map(post => {
    //   if(post._id === data._id) {
    //     console.log('tjenare');
    //   }
    // })
    // } );
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
            voteUp = {this.voteUp}
          />
        </div>
        {/* TUTORIALGREJS NEDAN
        <Todos todos = {this.state.todos}/>*/}
      </div>
    );
  }
}
export default App;
