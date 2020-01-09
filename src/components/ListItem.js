import React, {Component} from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
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
           <p> <span className="vote" onClick={this.props.voteUp.bind(this, _id)}>&#8657;</span></p>
           <p> <span className="vote" onClick={this.voteDown}>&#8659;</span></p>
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
