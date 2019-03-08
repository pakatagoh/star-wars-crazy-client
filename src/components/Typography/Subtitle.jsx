import React from 'react';
import styled from 'styled-components';

const Subtitle = props => {
  const { children, text, as } = props;

  const StyledSubtitle = styled.h4`
    font-weight: 300;
  `;

  return <StyledSubtitle as={as && as}>{text || children}</StyledSubtitle>;
};

export default Subtitle;
