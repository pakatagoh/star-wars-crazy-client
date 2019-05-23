import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

const StyledFormikField = styled(Field)`
  & {
    width: 100%;
    ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth}px;` : null)};
    padding: 10px 5px;
    border: none;
    border-bottom: 1px solid white;
    background: none;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const StyledFormikTextArea = styled(Field)`
  & {
    width: 100%;
    height: 150px;
    padding: 10px 5px;
    border: none;
    border-bottom: 1px solid white;
    background: none;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const InputField = props => {
  const { name, margin, component, ...rest } = props;
  return (
    <>
      <div className={`mb-${margin}`}>
        {component === 'textarea' ? (
          <StyledFormikTextArea name={name} component={component} {...rest} />
        ) : (
          <StyledFormikField name={name} component={component} {...rest} />
        )}
      </div>
      <div className={`mb-${margin}`}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default InputField;
