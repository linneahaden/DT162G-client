import React, {Component} from 'react';

class List extends Component {

  render() {

    console.log(this.props.posts);
    return (
      <div>
          <h2>Lista</h2>
          {
            //Om this.props.posts är laddat, mappa innehållet, annars console.log.
            this.props.posts ? this.props.posts.map((row) => {
            console.log(row);

            //Anropa varje posts-komponent med data från row
          }): console.log('fel')}

      </div>
    );



  }
}

export default List;
