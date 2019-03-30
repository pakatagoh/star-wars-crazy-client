import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
      if (item.type === 'button') {
        return (
          <div
            key={item.text}
            className="d-flex justify-content-end justify-content-sm-start pt-2 pt-sm-0 pb-2 pb-sm-0 ml-sm-2"
          >
            {item.to ? (
              <Link to={item.to}>
                <ButtonCrawl>{item.text}</ButtonCrawl>
              </Link>
            ) : (
              <ButtonCrawl onClick={handleLogout}>{item.text}</ButtonCrawl>
            )}
          </div>
        );
      }
      return (
        <div
          key={item.text}
          className="d-flex justify-content-end justify-content-sm-start pt-2 pt-sm-0 pb-2 pb-sm-0 ml-sm-2"
        >
          <NavLinkWhite key={item.text} to={item.to} className="nav-link">
            <NavItem>{item.text}</NavItem>
          </NavLinkWhite>
        </div>
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
