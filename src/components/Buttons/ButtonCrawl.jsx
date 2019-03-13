import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  &.btn {
    border-color: rgb(75, 213, 238);
    color: rgb(75, 213, 238);
  }
  &.btn:hover {
    background-color: rgb(75, 213, 238);
    color: white;
  }

  &.btn:disabled {
    background-color: transparent;
    border-color: rgb(75, 213, 238);
    color: rgb(75, 213, 238);
  }
`;

const ButtonCrawl = props => {
  const { text, type, children, onClick, className, disabled } = props;

  const classes = `btn ${className ? className : ''}`;

  return (
    <StyledButton
      type={type ? type : 'button'}
      onClick={onClick ? onClick : null}
      className={classes}
      disabled={disabled && disabled}
    >
      {text || children}
    </StyledButton>
  );
};

export default ButtonCrawl;
