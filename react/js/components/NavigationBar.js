import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import {removeTokenFromStorage} from "../helper/util";
import userStore from "../stores/userStore";
import { observer } from "mobx-react";

@observer
export default class MenuExampleBasic extends Component {

  constructor() {
    super();
    this.state = { activeItem : "Interaction" }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    console.log("user");
    console.log(userStore.userFromServer);

    return (
      <Menu >
        <Menu.Item
          as={Link} to='/story'
          name='Stories'
          active={activeItem === 'Stories'}
          onClick={this.handleItemClick}>
          Story
       </Menu.Item>
       <Menu.Item
          as={Link} to='/mobxinteraction'
          name='Interaction'
          active={activeItem === 'Interaction'}
          onClick={this.handleItemClick}>
          Interaction
       </Menu.Item>
          { userStore.userFromServer === null ?
          <Menu.Item
              as={Link} to='/login'
              name='Login'
              active={activeItem === 'Login'}
              onClick={this.handleItemClick}>
              Login
          </Menu.Item> :
              <Menu.Item
                  position='right'
                  onClick={() => {
                      removeTokenFromStorage();
                      userStore.user = null;
                      this.setState({})
                  }}
                  active={true}
                  key="logout">
                  <Link to={"/"}>
                      Logout
                  </Link>
              </Menu.Item> }
      </Menu>
    )
  }
}




/*














import React from "react";
import { Link } from "react-router-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { Menu } from 'semantic-ui-react'

@observer
export default class NavigationBar extends React.Component {

  @observable collapse = true;

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  render() {
    const navClass = this.collapse ? "collapse" : "";

    return (
        <Menu>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>



      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar" />
              <span class="icon-bar" />
              <span class="icon-bar" />
            </button>
          </div>
        </div>
        <div class={"navbar-collapse " + navClass}>
          <ul class="nav navbar-nav">
            <li>
              <Link to="textfromrestcall" onClick={this.toggleCollapse.bind(this)}>TextRest</Link>
            </li>
            <li>
              <Link to="mobxinteraction" onClick={this.toggleCollapse.bind(this)}>Interaction</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

*/
