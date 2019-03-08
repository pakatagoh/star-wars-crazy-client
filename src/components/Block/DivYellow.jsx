import React from 'react';
import styled from 'styled-components';

const DivYellow = props => {
  const { children, className, as, thickness } = props;
  const StyledDivYellow = styled.div`
    border-style: solid;
    border-width: ${props => (props.thickness ? props.thickness : '0.5')}rem;
    border-color: ${props => (props.theme.primary ? props.theme.primary : 'white')};
    border-radius: 1rem;
  `;

  const classes = `${className}`;
  return (
    <StyledDivYellow className={classes} as={as && as} thickness={thickness}>
      {children}
    </StyledDivYellow>
  );
};

export default DivYellow;
