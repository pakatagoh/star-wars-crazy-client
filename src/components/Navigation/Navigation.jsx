import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Collapse, NavbarToggler, Nav, NavItem, Navbar } from 'reactstrap';
import NavLogo from './NavLogo';
import NavLinkWhite from './NavLinkWhite';
import Spinner from '../Spinner/Spinner';
import ButtonYellow from './../Buttons/ButtonYellow';
import ButtonCrawl from './../Buttons/ButtonCrawl';
import { UserContext } from './../../App';

const StyledAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
  object-fit: cover;
  object-position: center;
`;

const Navigation = props => {
  const { navBrand, navItemsLeft, navItemsRight, handleLogout } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useContext(UserContext);

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

  const renderNavItemsRight = () => (
    <>
      {user && (
        <div className="d-flex justify-content-end justify-content-sm-start pt-2 pt-sm-0 pb-2 pb-sm-0 ml-sm-2">
          <div className="d-flex align-items-center">
            <StyledAvatar src={user.imageUrl} alt={user.firstName} />
            <p className="m-0 ml-2">{user.firstName}</p>
          </div>
        </div>
      )}
      {navItemsRight.map(item => {
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
                <ButtonYellow onClick={handleLogout}>{item.text}</ButtonYellow>
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
      })}
    </>
  );

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
            <Nav className="ml-auto align-items-sm-center" navbar>
              {navItemsRight && renderNavItemsRight()}
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
