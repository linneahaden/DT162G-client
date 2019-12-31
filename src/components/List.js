import React, {Component} from 'react';

class List extends Component {
  render() {
    console.log(this.props.posts);
     //Om this.props.posts är laddat, mappa innehållet, annars visa reserv-vy.
    if(this.props.posts) {
      return(
        this.props.posts.map((row)=> (
        <h3>{row.title}</h3>
        )
    ));
    } else {
      return (
        <div>
            <h2>Arrayen är tom</h2>
        </div>
      );
    }
  }
}

export default List;
