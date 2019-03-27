import React, { useState, useContext } from 'react';
import { Collapse, NavbarToggler, Nav, NavItem, Navbar } from 'reactstrap';
import NavLogo from './NavLogo';
import NavLinkWhite from './NavLinkWhite';
import ButtonCrawl from '../Buttons/ButtonCrawl';
import { UserContext } from './../../App';
import Spinner from '../Spinner/Spinner';

const Navigation = props => {
  const { navBrand, navItemsLeft, navItemsRight, handleLogout } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useContext(UserContext);

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
    return navItemsRight.map(item => {
      if (item.text === 'Logout') {
        return (
          <ButtonCrawl key={item.text} onClick={handleLogout}>
            {item.text}
          </ButtonCrawl>
        );
      }
      return (
        <NavLinkWhite key={item.text} to={item.to} className="nav-link">
          <NavItem>{item.text}</NavItem>
        </NavLinkWhite>
      );
    });
  };

  return (
    <div data-testid="navigation-bar">
      <Navbar expand="sm" color="dark" dark>
        <NavLogo {...navBrand} />
        <Nav>{navItemsLeft && renderNavItemsLeft()}</Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {isLoading ? (
            <Spinner />
          ) : (
            <Nav className="ml-auto" navbar>
              {navItemsRight && renderNavItemsRight()}
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
