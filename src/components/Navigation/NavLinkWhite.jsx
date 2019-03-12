import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledRRNavLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.7);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const NavLinkWhite = ({ children, className, ...props }) => {
  return (
    <StyledRRNavLink className={`${className} nav-link`} {...props}>
      {children}
    </StyledRRNavLink>
  );
};

export default NavLinkWhite;
