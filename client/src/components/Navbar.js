import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }
    }


  render () {
    return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Social Talker</NavbarBrand>
        <NavbarToggler onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavBar;