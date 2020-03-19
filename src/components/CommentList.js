import React, {Component} from 'react';
import CommentListItem from './CommentListItem';

class CommentList extends Component {
  render() {
     //Om this.props.posts är laddat, mappa innehållet, annars visa reserv-vy.
    if(this.props.comments) {
      //console.log(this.props);
      return(
        this.props.comments.map((comment)=> (
          <CommentListItem
            key={comment._id}
            comment={comment}
            deleteComment={this.props.deleteComment}
            postId={this.props.postId}
          />
          )
        )
    );
    } else {
      return (
        <div>
            <h2>Kommentarer kunde inte laddas</h2>
        </div>
      );
    }
  }
}
export default CommentList;
