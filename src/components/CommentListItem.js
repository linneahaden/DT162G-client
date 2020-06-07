import React, {Component} from 'react';
import {updateCommentRequest} from '../api.js';

class CommentListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment.content,
      changePostFormVisibility: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  //Input change i kommentarsformuläret
  handleInputChange(event) {
    this.setState({
      comment: event.target.value
    });
  }
  // Hanterar submit från kommentarsformuläret
  handleCommentSubmit(event) {
    if(this.state.comment === '') {
      alert('Skriv något');
    } else {
      const submitData =  {
         "content": this.state.comment
      }
      updateCommentRequest(this.props.postId, this.props.comment._id, submitData);
    }
    this.setState({comment: ''});

    event.preventDefault();
    // På grund av datans utformning från databasen behöver
    // hela posten hämtas igen. Här hade jag kunnat planera
    // lite bättre.
    // ALTERNATIV: Man man uppdatera state/props med bara kommentaren?
    window.location.reload(true);
  }

  toggleUpdateForm = () => {
    console.log('update comment');
    this.setState({changePostFormVisibility: !this.state.changePostFormVisibility});
  }

  deleteCommentClick = () => {
    this.props.deleteComment(this.props.postId, this.props.comment._id)
    //console.log(this.props.postId);
    //console.log(this.props.comment._id);
  }

  render() {

    if (this.state.changePostFormVisibility === true) {
      var formStyle = { 'display': 'block' }
    } else {
      formStyle = { 'display': 'none' }
    }

     //Om this.props.posts är laddat, mappa innehållet, annars visa reserv-vy.
    if(this.props) {
      //console.log(this.props);
      return(
        <div className="commentContainer">
          <p className="commentContent">
            {this.props.comment.content}
          </p>
          <div className="commentFooter">
            <p className="vote" onClick={this.toggleUpdateForm}>&#9998;</p>
            <p className="vote" onClick={this.deleteCommentClick}>&#127367;</p>
          </div>


            {/*Formulär för ny kommentar*/}
            <form style={formStyle} onSubmit={this.handleCommentSubmit}>
              <label>
              <h2 className="title">Ändra kommentar</h2>
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
    );
    } else {
      return (
        <div>
            <h2>Kommentaren kunde inte laddas</h2>
        </div>
      );
    }
  }
}

export default CommentListItem;
