import React from 'react';
import styled from 'styled-components';

const StyledOverline = styled.h6`
  font-weight: bold;
  line-height: 1;
`;

const Overline = props => {
  const { children, as, text } = props;

  return <StyledOverline as={as && as}>{children || text}</StyledOverline>;
};

export default Overline;
