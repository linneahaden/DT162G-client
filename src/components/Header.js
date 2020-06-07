import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class Header extends Component {

  constructor(props) {
    super(props);
    //State är inledningsvis false för att gömma manyn.
    this.state = { isMenuActive: false };
  }

  render() {

    // console.log(this.state.isMenuActive);

      return (
        <header className="App-header">
          <nav>
            <div className="logo">
              <h2><NavLink exact activeClassName="active" to="/">'amen KOLLA!</NavLink></h2>
            </div>
                <ul className={
                  //Vid state === true läggs navActive till i klassen.
                  this.state.isMenuActive ? "navLinks navActive" : "navLinks"}>
                   {/*NavLink är länkar anpassade för routern*/}
                  <li><NavLink exact activeClassName="active" to="/compose">Nytt inlägg</NavLink></li>
                </ul>
            <div
              className="hamburger"
              //OnClick sätter state till det motsatta.
              onClick={() => this.setState({ isMenuActive: !this.state.isMenuActive })}
              >
              <div className={this.state.isMenuActive ? "toggle1 hamburger1" : "hamburger1"}></div>
              <div className={this.state.isMenuActive ? "toggle2 hamburger2" : "hamburger2"}></div>
              <div className={this.state.isMenuActive ? "toggle3 hamburger3" : "hamburger3"}></div>
            </div>
          </nav>
        </header>
      );
  }
}

export default Header;
