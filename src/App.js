import React, {Component} from 'react';
import './App.css';
import {getPosts} from './api.js';
// import Todos from './components/Todos';
import List from './components/List';

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
    // Importera och skapa en komponent för varje rad av posts (row)
    this.setState({posts : data});
  }

// Render är en lifecycle method och är den enda metod som är
// obligatorisk eftersom den renderar till webbläsaren.
  render() {
      // console.log(this.state.posts);
    return (
      // className istället för class i markupen.
      <div className="App">
        <header className="App-header">
        {/*Inkluderar komponenten List och skickar state-innehållet som props till List.*/}
        <List posts = {this.state.posts} />
        </header>
        {/* TUTORIALGREJS NEDAN
        <Todos todos = {this.state.todos}/>*/}

      </div>
    );
  }
}
export default App;
