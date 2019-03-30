import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  &.btn {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
  &.btn:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }

  &.btn:disabled {
    background-color: transparent;
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

const ButtonYellow = props => {
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

export default ButtonYellow;
