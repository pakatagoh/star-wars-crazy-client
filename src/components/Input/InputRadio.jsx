import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  & + label::before {
    content: '😆';
    display: block;
  }

  &:checked + label::before {
    content: '💩';
  }
`;

const InputRadio = props => {
  const { className, label, id, ...inputProps } = props;

  const classes = `${className}`;

  return (
    <>
      <StyledInput {...inputProps} type="radio" className="sr-only" />
      {label && (
        <label htmlFor={id} className={classes}>
          {label}
        </label>
      )}
    </>
  );
};

export default InputRadio;
