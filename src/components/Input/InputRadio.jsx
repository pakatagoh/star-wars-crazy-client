import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  & + label {
    cursor: pointer;
  }

  & + label::before {
    content: '';
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    display: inline-flex;
    align-items: center;
    background-image: url('https://i.pinimg.com/originals/60/b7/30/60b73041000047d4e8737d4eee9c5a08.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:checked + label::before {
    content: '';
    background-image: url('https://cdn4.iconfinder.com/data/icons/famous-characters-add-on-vol-1-flat/48/Famous_Character_-_Add_On_1-37-128.png');
  }
`;

const InputRadio = props => {
  const { className, id, onChange, name, value, checked } = props;

  const classes = `sr-only ${className ? className : ''}`;

  return (
    <StyledInput
      type="radio"
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      checked={checked}
      className={classes}
    />
  );
};

export default InputRadio;
