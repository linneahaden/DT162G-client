import React, {Component} from 'react';
import ListItem from './ListItem';
import CommentList from './CommentList';
import {newComment} from '../api.js';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  //Input change i kommentarsformuläret
  handleInputChange(event) {
    this.setState({
      comment: event.target.value
    });
    //console.log(this.state);
  }

  // Hanterar submit från kommentarsformuläret
  handleCommentSubmit(event) {

    if(this.state.comment === '') {
      alert('Skriv något');
    } else {
      const submitData =  {
         "content": this.state.comment
      }
      newComment(this.props.match.params.id, submitData);
    }
    this.setState({comment: ''});

    // TODO: Ladda om sidan
    event.preventDefault();
    // På grund av datans utformning från databasen behöver
    // hela posten hämtas igen. Här hade jag kunnat planera
    // lite bättre.
    // ALTERNATIV: Kan man uppdatera state/props med bara kommentaren?
    window.location.reload(true);
  }

  render() {

    const {
      match: {
        params: { id }
      }
    } = this.props;

    if(this.props.posts) {
      //console.log(this.props);
      // Letar upp rätt post utifrån url-param id
      const post = this.props.posts.find(posts => (posts._id === id));
      //console.log(post.comments);

      return(
        <div className="commentList">
          <ListItem
            key={post._id}
            singlePost={post}
            deletePost={this.props.deletePost}
            categories = {this.props.categories}
            singlePostDelete = {true}
          />
          <div className="formContainer">
            {/*Formulär för ny kommentar*/}
            <form onSubmit={this.handleCommentSubmit}>
              <label>
              <h2 className="title">Skriv en kommentar</h2>
              <textarea
                value={this.state.comment}
                onChange={this.handleInputChange}
                type="text"
                name="comment"
              ></textarea>
              </label>
              <input className="button" type="submit" value="Skicka" />
            </form>
          </div>
          <CommentList
            key={post.comments.index}
            comments={post.comments}
            deleteComment={this.props.deleteComment}
            postId={id}
          />

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

export default SinglePost;
