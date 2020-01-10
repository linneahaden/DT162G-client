import React, {Component} from 'react';
import {voteUpRequest, voteDownRequest} from '../api.js';

class ListItem extends Component {

  // Efterfrågar voteUpRequest från api.js
  async voteUp(_id) {
    const data = await voteUpRequest(_id);
    // console.log(_id);
    // console.log(data);
    // console.log(data._id);
    // console.log(this.props.singlePost._id);

     if(this.props.singlePost._id === data._id) {
        //console.log(this.props.singlePost.votesUp);
        this.setState( {posts : this.props.singlePost.votesUp = data.votesUp})
        //console.log(this.props.singlePost.votesUp);
      }
    }

    // Efterfrågar voteDownRequest från api.js
    async voteDown(_id) {
      const data = await voteDownRequest(_id);
      // console.log(_id);
      // console.log(data);
      // console.log(data._id);
      // console.log(this.props.singlePost._id);

       if(this.props.singlePost._id === data._id) {
          //console.log(this.props.singlePost.votesUp);
          this.setState( {posts : this.props.singlePost.votesDown = data.votesDown})
          //console.log(this.props.singlePost.votesUp);
        }
      }


  render() {

    //Destructuring (Hämtar ut variablerna för att inte behövs skriva this.props.singlePost innan varje.)
    const { _id, title, url, votesUp, votesDown, comments, category } = this.props.singlePost;

    //Om this.props.posts är laddat, visa innehållet,
    //annars visa reserv-vy.
   if(this.props.singlePost) {
     return(
       <div className="listItem">
         <h3 className="title">{title}</h3>
         <p><a href={url}>{url}</a></p>
         <footer className="listItemFooter">
           <p>Posted in</p>
           {/*Vid klick, efterfråga funktion voteUp och skicka med postens _id.*/}
           <p> <span className="vote" onClick={() =>this.voteUp(_id)}>&#8657;</span></p>
           <p> <span className="vote" onClick={() =>this.voteDown(_id)}>&#8659;</span></p>
           <p>Comments</p>
           <p>{category}</p>
           <p>{votesUp}</p>
           <p>{votesDown}</p>
           <p>{comments.length}</p>
         </footer>
       </div>
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

export default ListItem;
