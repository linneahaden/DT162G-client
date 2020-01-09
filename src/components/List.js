import React, {Component} from 'react';
import ListItem from './ListItem';

class List extends Component {

  render() {
     //Om this.props.posts är laddat, mappa innehållet, annars visa reserv-vy.
    if(this.props.posts) {

      return(
        // Pappar innehållet i posts där varje post är singlePost
        this.props.posts.map((singlePost)=> (
        //Inkluderar ListItem och skickar singlePost som en prop till ListItem
        //Key måste vara något unikt
        <ListItem
          key={singlePost._id}
          singlePost={singlePost}
          voteUp = {this.props.voteUp}
        />
        )
      )
  );
    } else {
      return (
        <div>
            <h2>Ingen data laddad</h2>
        </div>
      );
    }
  }
}

export default List;
