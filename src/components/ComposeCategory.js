import React, {Component} from 'react';

class ComposeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: '',
    };
    console.log(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewCategorySubmit = this.handleNewCategorySubmit.bind(this);
  }

  handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });

  console.log(this.state);
}

  async handleNewCategorySubmit(event) {
     event.preventDefault();
     // TODO: Check if category exists
     // this.props.categories.map((category) =>{
     //   if(category.categoryName === this.state.newCategory){
     //     alert('Kategorin finns redan.');
     //   }
     // });
     //
     // if(this.state.newCategory === '') {
     //   alert('Ange ett namn på den kategori du vill skapa.');
     // } else {
     //   const submitData =  {"categoryName": this.state.newCategory}
     //   console.log(submitData);
     //   if(this.props.createCategory(submitData)) {
     //     alert('Kategori skapad');
     //   }
     // }
     alert('Denna funktion är ännu inte inte enablad.');
   }



  render() {

    // const fillInCategories = () => {
    //   //Loopar genom kategorierna och lägger till val i rullisten
    //   return this.props.categories.map((category, index) =>{
    //     return category.categoryName ? (
    //       <option key={index} value={category.categoryName}>{category.categoryName}</option>
    //     ) : console.log();
    //   });
    // }

    //Om this.props.categories är laddat, mappa innehållet, annars visa reserv-vy.
   if(this.props.categories) {
      return (
          <div className="formContainer">
            <h2>Skapa ny kategori</h2>
            <form onSubmit={this.handleNewCategorySubmit}>
              <label>
                <input
                  value={this.state.newCategory}
                  onChange={this.handleInputChange}
                  type="text"
                  name="newCategory"
                />
              </label>
              <input className="button" type="submit" value="Skapa" />
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

export default ComposeCategory;
