import React from 'react';
import styled from 'styled-components';

const Subtitle = props => {
  const { children, text, as, className } = props;

  const StyledSubtitle = styled.h4`
    font-weight: 300;
  `;

  const classes = `${className ? className : ''}`;
  return (
    <StyledSubtitle as={as && as} className={classes}>
      {text || children}
    </StyledSubtitle>
  );
};

export default Subtitle;
