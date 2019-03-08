import React, { useState } from 'react';
import { Collapse, NavbarToggler, Nav, NavItem, Navbar } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import NavLogo from './NavLogo';
import styled from 'styled-components';

const NavigationView = props => {
  const { navBrand, navItemsLeft, navItemsRight } = props;
  const [isOpen, setIsOpen] = useState(false);

  const StyledRRNavLink = styled(RRNavLink)`
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  `;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderNavItemsLeft = () => {
    return navItemsLeft.map(item => (
      <StyledRRNavLink to={item.to} className="nav-link">
        <NavItem>{item.text}</NavItem>
      </StyledRRNavLink>
    ));
  };

  const renderNavItemsRight = () => {
    return navItemsRight.map(item => (
      <StyledRRNavLink to={item.to} className="nav-link">
        <NavItem>{item.text}</NavItem>
      </StyledRRNavLink>
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
