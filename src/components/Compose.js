import React, {Component} from 'react';
import {newPost} from '../api.js';
import ComposeCategory from './ComposeCategory';

class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      category: '',
      description: '',
      newCategory: '',
    };
    console.log(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewPostSubmit = this.handleNewPostSubmit.bind(this);
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

 async handleNewPostSubmit(event) {
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
      let response = await newPost(submitData);
      // Använder vanilla js här då jag inte får Redirect att funka
      window.location = '/post/' + response._id;
      // return (
      //     <Redirect push to="/post/"{...response._id} />
      // );
    }
  }

  async handleNewCommentSubmit(event) {
     event.preventDefault();
     // TODO: Check if category exists
     if(this.state.newCategory === '') {
       alert('Ange ett namn på den kategori du vill skapa.');
     } else {
       const submitData =  {"newCategory": this.state.category}
       console.log(submitData);
       //let response = await newCategory(submitData);
       // Använder vanilla js här då jag inte får Redirect att funka
       //window.location = '/post/' + response._id;
       // return (
       //     <Redirect push to="/post/"{...response._id} />
       // );
     }
   }

  render() {

    const fillInCategories = () => {
      //Loopar genom kategorierna och lägger till val i rullisten
      return this.props.categories.map((category, index) =>{
        return category.categoryName ? (
          <option key={index} value={category.categoryName}>{category.categoryName}</option>
        ) : console.log();
      });
    }

    //Om this.props.categories är laddat, mappa innehållet, annars visa reserv-vy.
   if(this.props.categories) {
      return (
        <div className="commentList">
          <div className="formContainer">
              <h2>Skriv ett inlägg</h2>
              <form onSubmit={this.handleNewPostSubmit}>
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
                <input className="button" type="submit" value="Skapa" />
              </form>
          </div>
          <ComposeCategory
            categories = {this.props.categories}
            createCategory = {this.props.createCategory}
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

export default Compose;
