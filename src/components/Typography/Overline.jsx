import React from 'react';
import styled from 'styled-components';

const Overline = props => {
  const { children, as, text } = props;
  const StyledOverline = styled.h6`
    font-weight: bold;
    line-height: 1;
  `;

  return <StyledOverline as={as && as}>{children || text}</StyledOverline>;
};

export default Overline;
