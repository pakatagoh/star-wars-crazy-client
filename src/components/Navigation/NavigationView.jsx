import React, { useState } from 'react';
import { Collapse, NavbarToggler, Nav, NavItem, Navbar } from 'reactstrap';
import NavLogo from './NavLogo';
import NavLinkWhite from './NavLinkWhite';

const NavigationView = props => {
  const { navBrand, navItemsLeft, navItemsRight } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderNavItemsLeft = () => {
    return navItemsLeft.map(item => (
      <NavLinkWhite key={item.text} to={item.to} className="nav-link">
        <NavItem>{item.text}</NavItem>
      </NavLinkWhite>
    ));
  };

  const renderNavItemsRight = () => {
    return navItemsRight.map(item => (
      <NavLinkWhite key={item.text} to={item.to} className="nav-link">
        <NavItem>{item.text}</NavItem>
      </NavLinkWhite>
    ));
  };

  return (
    <div data-testid="navigation-bar">
      <Navbar expand="sm" color="dark" dark>
        <NavLogo {...navBrand} />
        <Nav>{navItemsLeft && renderNavItemsLeft()}</Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {navItemsRight && renderNavItemsRight()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationView;
