import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  
  handleItemClick = (e, { name }) => this.props.handleNavBarItemClick(name)
  handleLogoutClick = (e, { name }) => this.props.handleNavBarLogoutClick(name)
  render() {
    const { activeItem } = this.props

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={ Link }
            to='/profile'
          />
          <Menu.Item
            name='matches'
            active={activeItem === 'matches'}
            onClick={this.handleItemClick}
            as={ Link }
            to='/matches'
          />
          <Menu.Item
            name='edit profile'
            active={activeItem === 'edit profile'}
            onClick={this.handleItemClick}
            as={ Link }
            to='/profile/edit'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleLogoutClick}
              as={ Link }
              to='/'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}