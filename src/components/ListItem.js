import React, {Component} from 'react';
import {voteUpRequest, voteDownRequest, updatePostRequest} from '../api.js';
import { NavLink } from "react-router-dom";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.singlePost.title,
      url: this.props.singlePost.url,
      category: this.props.singlePost.category,
      description: this.props.singlePost.description,
      changePostFormVisibility: false
    };
    console.log(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostUpdateSubmit = this.handlePostUpdateSubmit.bind(this);
  }

  // Efterfrågar voteUpRequest från api.js
  async voteUp(_id) {
    const data = await voteUpRequest(_id);
    // console.log(_id);
    console.log(data._id);
    console.log(this.props.singlePost._id);

    // Uppdaterar state
     if(this.props.singlePost._id === data._id) {
        this.setState( {posts : this.props.singlePost.votesUp = data.votesUp})
      }
    }

    // Efterfrågar voteDownRequest från api.js
    async voteDown(_id) {
      const data = await voteDownRequest(_id);
      // console.log(_id);
      // console.log(data._id);
      // console.log(this.props.singlePost._id);

      // Uppdaterar state
      if(this.props.singlePost._id === data._id) {
        this.setState( {posts : this.props.singlePost.votesDown = data.votesDown})
      }
    }

    deletePostClick = () => {
      this.props.deletePost(this.props.singlePost._id);
      //Ladda startsidan när en post raderas från SinglePost->ListItem
      if(this.props.singlePostDelete){
        window.location.assign("/");
      }

    }

    toggleUpdateForm = () => {
      console.log('update post');
      this.setState({changePostFormVisibility: !this.state.changePostFormVisibility});
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

      //console.log(this.state);
    }

    async handlePostUpdateSubmit(event) {
       event.preventDefault();
       // TODO: Check if url i valid
       if(this.state.title === '' || this.state.url === '' || this.state.category === '' || this.state.description === '') {
         alert('Fyll i alla fält');
       } else {
         const submitData =  {
            "title" : this.state.title,
            "url": this.state.url,
            "category": this.state.category,
            "description": this.state.description,
         }
         let response = await updatePostRequest(this.props.singlePost._id, submitData);
         // Använder ren js här då jag inte får Redirect att funka
         window.location = '/post/' + response._id;
         // return (
         //     <Redirect push to="/post/"{...response._id} />
         // );
       }
     }

  render() {

    //Destructuring (Hämtar ut variablerna för att inte behövs skriva this.props.singlePost innan varje.)
    const { _id, title, url, votesUp, votesDown, comments, category, description } = this.props.singlePost;
    const postUrl = "/post/" + _id;

    if (this.state.changePostFormVisibility === true) {
      var formStyle = { 'display': 'block' }
    } else {
      formStyle = { 'display': 'none' }
    }

    const fillInCategories = () => {
      //Loopar genom kategorierna och lägger till val i rullisten
      return this.props.categories.map((category, index) =>{
        return category.categoryName ? (
          <option key={index} value={category.categoryName}>{category.categoryName}</option>
        ) : console.log();
      });
    }

    //Om this.props.singlePost är laddat, visa innehållet,
    //annars visa reserv-vy.
   if(this.props.singlePost && this.props.categories) {
     return(
       <div className="listItem">
         <h3 className="title">
          <NavLink activeClassName="active" to={postUrl}>{title}</NavLink>
         </h3>
         <p><a href={url}>{url}</a></p>
         <p>{description}</p>
         <footer className="listItemFooter">

           <p>Score</p>
           {/*Vid klick, efterfråga funktion voteUp och skicka med postens _id.*/}
           <p> <span className="vote" onClick={() =>this.voteUp(_id)}>&#8657;</span></p>
           <p> <span className="vote" onClick={() =>this.voteDown(_id)}>&#8659;</span></p>
           <p><NavLink activeClassName="active" to={postUrl}>Comments</NavLink></p>
           <p>Posted in</p>
           <p><span className="vote" onClick={this.toggleUpdateForm}>&#9998;</span></p>
           <p className="fullHeight">{votesUp-votesDown}</p>
           <p>{votesUp}</p>
           <p>{votesDown}</p>
           <p><NavLink activeClassName="active" to={postUrl}>{comments.length}</NavLink></p>
           <p>{category}</p>
           <p><span className="vote" onClick={this.deletePostClick}>&#127367;</span></p>
         </footer>
         {/*Formulär för ändring av inlägg*/}
         <form style={formStyle} onSubmit={this.handleSubmit}>
           <h3>Uppdatera inlägg</h3>
           <label>
           <p>Titel</p>
           <input
             value={this.state.title}
             onChange={this.handleInputChange}
             type="text"
             name="title"
           />
           </label>
           <label>
           <p>Url</p>
           <input
             value={this.state.url}
             onChange={this.handleInputChange}
             type="text"
             name="url"
           />
           </label>
           <label>
           <p>Beskriv din länk</p>
           <textarea
             value={this.state.description}
             onChange={this.handleInputChange}
             type="text"
             name="description"
           ></textarea>
           </label>
           <label>
           <p>Kategori</p>
           <select
             value={this.state.category}
             onChange={this.handleInputChange}
             name="category"
           >
             <option value=''>Välj en kategori</option>
             {fillInCategories()}
           </select>
           </label>
           <p></p>
           <input className="button" type="submit" value="Skicka" onClick={this.handlePostUpdateSubmit}/>
           <input className="button" type="reset" value="Avbryt" onClick={this.toggleUpdateForm} />
         </form>
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
